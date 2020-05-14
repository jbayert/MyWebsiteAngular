import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpireRoutingModule } from './empire-routing.module';
import { EmpireComponent } from './empire.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { EmpireListComponent } from './empire-list/empire-list.component';
import { JoinGameComponent } from './join-game/join-game.component';

@NgModule({
  declarations: [
    EmpireComponent,
    EmpireListComponent,
    JoinGameComponent
  ],
  imports: [
    EmpireRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [EmpireComponent]
})
export class EmpireModule { }
