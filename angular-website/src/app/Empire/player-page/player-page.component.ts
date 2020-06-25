import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service'
import { GameState, GameStateOption } from '../empire-service/empire-data.model'
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
    private router:Router) {
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

  addGuest(){
    this.router.navigate(['../join-as-guest'], {relativeTo:this.route , queryParams:{gameID:this.gameID}})
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) { this.stateSubscription.unsubscribe() }
  }
}
