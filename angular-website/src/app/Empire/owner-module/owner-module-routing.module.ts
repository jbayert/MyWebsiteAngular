import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { OwnerComponent } from './owner/owner.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  { path: 'createGame', component: CreateGameComponent },
  { path: 'game', component: GameComponent },
  { path: 'present', component: MonitorComponent },
  //TODO: screen
  { path: '', component: OwnerComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerModuleRoutingModule { }
