import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game/game.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OwnerModuleRoutingModule } from './owner-module-routing.module';
import { ResultListModule } from '../result-list/result-list.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListCodeNamesComponent } from './list-code-names/list-code-names.component';
import { PlayersJoinedComponent } from './players-joined/players-joined.component';
import { OwnerGuard } from './owner-guard/owner.guard';
import { OwnerComponent } from './owner/owner.component';

@NgModule({
  declarations: [
    GameComponent,
    CreateGameComponent,
    ListCodeNamesComponent,
    PlayersJoinedComponent,
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    OwnerModuleRoutingModule,
    ResultListModule,
  ],
  providers:[
    OwnerGuard,
  ],
})
export class OwnerModuleModule { 
  
}