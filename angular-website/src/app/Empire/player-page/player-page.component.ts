import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service'
import { GameState } from '../empire-service/empire-data.model'
import { Observable, PartialObserver, Subscription } from 'rxjs';
@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  gameState: GameState;
  gameStatusSub: Subscription;

  constructor(private empireService: EmpireService ) {
    empireService.listenGameState(100).then((listener)=>{
      this.gameStatusSub = listener.subscribe({
        next(x:GameState) { 
          console.log(`The current state is ${x.state}`);
          this.gameState = x;
        },
        error(err) { console.error('something wrong occurred: ' + err); },
        complete() { console.log('done'); }
      });
    })
    }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.gameStatusSub.unsubscribe();
  }

}
