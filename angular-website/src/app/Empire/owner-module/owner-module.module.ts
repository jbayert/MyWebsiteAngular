import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerModuleComponent } from './owner-module.component';
import { PlayersJoinedComponent } from '../players-joined/players-joined.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    OwnerModuleComponent,
    PlayersJoinedComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class OwnerModuleModule { }
