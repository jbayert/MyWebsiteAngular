import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerModuleComponent } from './owner-module.component';
import { CreateGameComponent } from '../create-game/create-game.component';
import { PlayersJoinedComponent } from '../players-joined/players-joined.component'

const routes: Routes = [
  { path: 'createGame', component: CreateGameComponent},
  { path: 'players-joined', component: PlayersJoinedComponent},
  { path: '', component: OwnerModuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerModuleRoutingModule { }
