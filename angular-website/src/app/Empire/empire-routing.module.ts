import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpireListComponent } from './empire-list/empire-list.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { CreateGameComponent } from './create-game/create-game.component'
import { OwnerModuleComponent } from './owner-module/owner-module.component'
import { EmpireComponent } from './empire-home/empire.component';

const routes: Routes = [
  { path: 'results', component: EmpireListComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'player', component: PlayerPageComponent},
  { path: 'createGame', component: CreateGameComponent},
  { path: 'owner', 
      loadChildren: () => import('./owner-module/owner-module.module').then(m => m.OwnerModuleModule),
      component: OwnerModuleComponent },
  { path: '', component: EmpireComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpireRoutingModule { }
