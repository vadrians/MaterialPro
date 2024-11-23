import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/lib/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Movie } from 'src/lib/movie.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, TitleCasePipe,MatFormFieldModule,
    MatInputModule,MatSort,MatSortModule],
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss',
})
export class MovieCatalogComponent implements OnInit {
  displayedColumns = ['overview', 'actors', 'rating', 'duration'];
  dataSource = new MatTableDataSource<Movie>([]);

  constructor(
    private readonly movieService: MovieService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['overview', 'rating']
        : ['overview', 'actors', 'rating', 'duration'];
    });
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  ngOnInit() {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.dataSource.data = movies; 
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
