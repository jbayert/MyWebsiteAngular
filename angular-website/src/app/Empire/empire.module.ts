import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpireRoutingModule } from './empire-routing.module';
import { EmpireComponent } from './empire-home/empire.component';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { EmpireListComponent } from './empire-list/empire-list.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { EmpireServiceModule } from './empire-service/empire-service.module';
import { PlayerPageComponent } from '../empire/player-page/player-page.component'

@NgModule({
  declarations: [
    EmpireComponent,
    EmpireListComponent,
    JoinGameComponent,
    CreateGameComponent,
    PlayerPageComponent
  ],
  imports: [
    EmpireServiceModule,
    EmpireRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [EmpireComponent]
})
export class EmpireModule { }
