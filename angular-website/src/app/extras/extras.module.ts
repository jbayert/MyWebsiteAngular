import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SnackbarComponent
  ]
})
export class ExtrasModule { }
