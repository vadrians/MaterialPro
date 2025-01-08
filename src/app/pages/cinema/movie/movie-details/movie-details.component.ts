import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MovieService } from 'src/lib/movie.service';
import { Movie, Showtime } from 'src/lib/movie.types';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    this.movieForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseYear: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      actors: this.fb.array([]),
      coverImage: ['', Validators.required],
      showtimes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.loadMovie(id);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadMovie(id: string): void {
    this.movieService.getMovieById(id).subscribe(
      (data: Movie) => {
        this.movieForm.patchValue(data);
        this.setActors(data.actors);
        this.setShowtimes(data.showtimes);
      },
      error => {
        console.error('Error loading movie', error);
        this.router.navigate(['/cinema/movie/details']);
      }
    );
  }

  setActors(actors: string[]): void {
    const actorsFormArray = this.movieForm.get('actors') as FormArray;
    actorsFormArray.clear();
    if (actors) {
      actors.forEach(actor => {
        actorsFormArray.push(this.fb.control(actor));
      });
    }
  }

  setShowtimes(showtimes: Showtime[]): void {
    const showtimesFormArray = this.movieForm.get('showtimes') as FormArray;
    showtimesFormArray.clear(); 
    if (showtimes) {
      showtimes.forEach(showtime => {
        showtimesFormArray.push(this.fb.group({
          day: [showtime.day, Validators.required],
          times: [showtime.times.join(', '), Validators.required] 
        }));
      });
    }
  }

  get actors(): FormArray {
    return this.movieForm.get('actors') as FormArray;
  }

  addActor(): void {
    this.actors.push(this.fb.control(''));
  }

  removeActor(index: number): void {
    this.actors.removeAt(index);
  }

  get showtimes(): FormArray {
    return this.movieForm.get('showtimes') as FormArray;
  }

  addShowtime(): void {
    this.showtimes.push(this.fb.group({
      day: ['', Validators.required],
      times: ['', Validators.required] 
    }));
  }

  removeShowtime(index: number): void {
    this.showtimes.removeAt(index);
  }

  saveMovie(): void {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value;
      movieData.actors = this.actors.value;
      movieData.showtimes = this.showtimes.value.map((showtime: any) => ({
        day: showtime.day,
        times: showtime.times.split(',').map((time: string) => time.trim())
      }));

      if (this.isEditMode) {
        this.movieService.updateMovie(movieData.id, movieData).subscribe(
          response => {
            this.router.navigate(['/cinema/movie/catalog']);
          },
          error => {
            console.error('Error updating movie', error);
          }
        );
      } else {
        this.movieService.addMovie(movieData).subscribe(
          response => {
            this.router.navigate(['/cinema/movie/catalog']);
          },
          error => {
            console.error('Error adding movie', error);
          }
        );
      }
    }
  }

  deleteMovie(): void {
    if (this.isEditMode) {
      this.movieService.deleteMovie(this.movieForm.value.id).subscribe(
        response => {
          this.router.navigate(['/cinema/movie/catalog']);
        },
        error => {
          console.error('Error deleting movie', error);
        }
      );
    }
  }
}