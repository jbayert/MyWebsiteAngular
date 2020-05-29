//TODO: remove this component
import { Component, OnInit } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';
import { GameStateOption, GameState } from '../empire-service/empire-data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  states: any;
  stateObservable: Observable<GameState>;
  stateOptions = GameStateOption;

  constructor(private empireService: EmpireService) {
    // (async () => {

    //   this.stateObservable = await empireService.listenGameState(100);
    //   this.stateObservable.subscribe((gameState)=>{
    //     this.states = gameState.state;
    //   })
    // })
    this.states = GameStateOption.acceptingUsers;
    console.log(this.states);
  }

  ngOnInit(): void {
  }

}
