import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/lib/movie.service';

@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [],
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss'
})
export class MovieCatalogComponent implements OnInit {

  constructor(private readonly movieService: MovieService) {
    
  }

  ngOnInit() {
    /* this.movieService.getMovies().subscribe((movies) => {
      console.log(movies);
    }); -----> this is what you need to connecting to your API */
  }

}
