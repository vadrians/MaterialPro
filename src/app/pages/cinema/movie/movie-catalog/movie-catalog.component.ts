import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MovieService } from 'src/lib/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Movie } from 'src/lib/movie.types';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';


@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.scss'],
})
export class MovieCatalogComponent implements OnInit {
  displayedColumns = ['overview', 'actors', 'rating', 'duration','edit'];
  dataSource = new MatTableDataSource<Movie>([]);
  dialogRef: MatDialogRef<MovieDialogComponent> | null = null;

  constructor(
    private readonly movieService: MovieService,
    private dialog: MatDialog,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['overview', 'rating']
        : ['overview', 'actors', 'rating', 'duration','edit'];
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

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

  openMovieDetails(movie: Movie): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = movie;

    this.dialogRef = this.dialog.open(MovieDialogComponent, dialogConfig);
  }
}