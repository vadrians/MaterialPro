import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/lib/movie.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Movie } from 'src/lib/movie.types';
import { MOVIES_CATALOG } from 'src/lib/movies.catalog.json';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, TitleCasePipe,MatFormFieldModule,   // Доданий модуль MatFormFieldModule
    MatInputModule],
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss',
})
export class MovieCatalogComponent implements OnInit {
  displayedColumns = ['overview', 'actros', 'rating', 'duration'];
  dataSource = new MatTableDataSource<Movie>(MOVIES_CATALOG);
  constructor(
    private readonly movieService: MovieService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['overview', 'actros', 'rating', 'duration']
        : ['overview', 'actros', 'rating', 'duration'];
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    /* this.movieService.getMovies().subscribe((movies) => {
      console.log(movies);
    }); -----> this is what you need to connecting to your API */
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
