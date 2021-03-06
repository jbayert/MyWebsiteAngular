import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinGameComponent } from './join-game/join-game.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { EmpireComponent } from './empire-home/empire.component';
import { LoginGuard } from '../auth/login-guard/login.guard';

const routes: Routes = [
  {
    path: 'join',
    component: JoinGameComponent,
    data: {
      guestID:false,
      //TODO: make relative add relative to canActivate
      redirectTo:'empire/join-as-guest',
    },
    canActivate:[LoginGuard],
  },
  {
    path: 'join-as-guest',
    component: JoinGameComponent,
    data: {guestID:true},
  },
  { path: 'player', component: PlayerPageComponent },
  {
    path: 'owner',
    loadChildren: () => import('./owner-module/owner-module.module').then(m => m.OwnerModuleModule),
    canLoad:[LoginGuard],
    canActivate:[LoginGuard],
  },
  { path: '', component: EmpireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpireRoutingModule { }
