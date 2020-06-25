import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EmpireService } from '../../empire-service/empire.service';
import { ActivatedRoute } from '@angular/router';
import { GameStateOption, GameState } from '../../empire-service/empire-data.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  displayState: any;
  gameState:GameState;

  stateSubscription: Subscription;
  stateOptions = GameStateOption;

  private _gameID: number;
  get gameID(): number {
    return this._gameID;
  };

  set gameID(theGameID: number) {
    if (this._gameID) {
      this.empireService.stopListeningToGameState(this._gameID);
    }
    
    this._gameID = theGameID;
    this.updateGameStateListener();
  }

  constructor(private empireService: EmpireService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,) {
    this.displayState = 'loading';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      if (queryParams.get("gameID")) {
        this.gameID = +queryParams.get("gameID");
      }
    });
  }


  async updateGameStateListener(){
    try {
      if (this.stateSubscription){
        this.stateSubscription.unsubscribe();
        this.stateSubscription = null;
      }
      if (this._gameID >0){
        let listener = await this.empireService.listenGameState(this._gameID);
        this.stateSubscription = listener.subscribe((gameState:GameState) => {
          if (!!gameState) {
            this.displayState = gameState.state;
            this.gameState = gameState;
          } else {
  
          }
          this.changeDetector.detectChanges();
        })
      }else{
        this.changeDetector.detectChanges();
      }
    }catch(error){
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) { this.stateSubscription.unsubscribe() }
  }
}
