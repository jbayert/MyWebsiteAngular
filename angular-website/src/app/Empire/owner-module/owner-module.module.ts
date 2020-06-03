import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerModuleComponent } from './owner-module.component';
import { PlayersJoinedComponent } from '../players-joined/players-joined.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListCodeNamesComponent } from '../list-code-names/list-code-names.component';

@NgModule({
  declarations: [
    OwnerModuleComponent,
    PlayersJoinedComponent,
    ListCodeNamesComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class OwnerModuleModule { }
