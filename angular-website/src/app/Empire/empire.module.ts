import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpireRoutingModule } from './empire-routing.module';
import { EmpireComponent } from './empire-home/empire.component';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { environment } from 'src/environments/environment';


import { JoinGameComponent } from './join-game/join-game.component';
import { EmpireServiceModule } from './empire-service/empire-service.module';
import { PlayerPageComponent } from '../empire/player-page/player-page.component';
import { LoginGuard } from '../auth/login-guard/login.guard';

@NgModule({
  declarations: [
    EmpireComponent,
    JoinGameComponent,
    PlayerPageComponent,
  ],
  imports: [
    EmpireServiceModule,
    EmpireRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [LoginGuard,],
  bootstrap: [EmpireComponent,],
})
export class EmpireModule { }
