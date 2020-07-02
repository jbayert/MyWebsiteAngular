import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game/game.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OwnerModuleRoutingModule } from './owner-module-routing.module';
import { ResultListModule } from '../result-list/result-list.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListCodeNamesComponent } from './list-code-names/list-code-names.component';
import { PlayersJoinedComponent } from './players-joined/players-joined.component';
import { OwnerComponent } from './owner/owner.component';
import { GetDomainModule } from 'src/app/get-domain-service/get-domain.module';
import { QRCodeModule } from 'angularx-qrcode';
import { RestartGameComponent } from './restart-game/restart-game.component';

@NgModule({
  declarations: [
    GameComponent,
    CreateGameComponent,
    ListCodeNamesComponent,
    PlayersJoinedComponent,
    OwnerComponent,
    RestartGameComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    OwnerModuleRoutingModule,
    ResultListModule,
    GetDomainModule,
    QRCodeModule,
  ],
})
export class OwnerModuleModule { 
  
}