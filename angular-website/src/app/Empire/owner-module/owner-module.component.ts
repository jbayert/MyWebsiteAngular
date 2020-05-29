import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';
import { GameStateOption, GameState } from '../empire-service/empire-data.model';
import { Observable,Subscription } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner-module.component.html',
  styleUrls: ['./owner-module.component.scss']
})
export class OwnerModuleComponent implements OnInit, OnDestroy {
  states: any;
  stateObservable: Observable<GameState>;
  stateSubscription: Subscription;
  stateOptions = GameStateOption;
  test:any;

  constructor(private empireService: EmpireService) {
    this.states = 'loading';
    this.empireService.listenGameState(100).then((observe)=>{
      observe.subscribe((gameState)=>{
        console.log(this.states)
        if(!!gameState){
          this.setState(gameState.state);
          this.states = gameState.state;
          console.log(this.states === this.stateOptions.acceptingUsers);
        }
        console.log(this.states)
      })
    }).catch(()=>{})
  }

  setState(state:any){
    this.states = state
    console.log(this.states)
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    if(this.stateSubscription){this.stateSubscription.unsubscribe()}
  }
}
