import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpireListComponent } from './empire-list/empire-list.component';
import { JoinGameComponent } from './join-game/join-game.component';

import { EmpireComponent } from './empire.component';

const routes: Routes = [
  { path: 'results', component: EmpireListComponent },
  { path: 'join', component: JoinGameComponent },
  { path: '', component: EmpireComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpireRoutingModule { }
