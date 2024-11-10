import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { CinemaRoutes } from './cinema.routing';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CinemaRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  declarations: [],
})
export class CinemaModule {}