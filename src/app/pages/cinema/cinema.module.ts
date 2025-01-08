import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { CinemaRoutes } from './cinema.routing';
import { MaterialModule } from 'src/app/material.module';
import { MovieService } from 'src/lib/movie.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MovieDialogComponent } from './movie/movie-dialog/movie-dialog.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component'; 
import { MovieCatalogComponent } from './movie/movie-catalog/movie-catalog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CinemaRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatSliderModule, 
  ],
  declarations: [
    MovieDialogComponent,
    MovieDetailsComponent,
    MovieCatalogComponent,
  ],
  providers: [
    MovieService // Provide the MovieService here
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here
  exports: [
    TablerIconsModule,
  ],
})
export class CinemaModule {}