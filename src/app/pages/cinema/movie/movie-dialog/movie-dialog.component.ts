import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  options!: UntypedFormGroup;
  stars: number[] = new Array(5); 
  calculatedStar: number;
  filledStar: number;
  halfStar: number;

  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.calculatedStar = data.rating / 2;
    this.filledStar = Math.floor(this.calculatedStar);
    this.halfStar = this.calculatedStar - this.filledStar >= 0.5 ? 1 : 0;
  }
}
