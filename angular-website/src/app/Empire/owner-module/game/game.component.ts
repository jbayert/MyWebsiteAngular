import { Component, OnInit, OnDestroy, ApplicationRef, NgZone } from '@angular/core';
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

  isMonitor:boolean=false;

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
    private route: ActivatedRoute,
    private applicationRef:ApplicationRef,
    private zone:NgZone) {
    this.displayState = 'loading';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      if (queryParams.get("gameID")) {
        this.gameID = +queryParams.get("gameID");
      }
    });
    if (this.route.snapshot.data.isMonitor) {
      this.isMonitor = this.route.snapshot.data.isMonitor;
      this.empireService.getPresentGame()
        .then((id)=>{this.gameID = id})
        .catch((error)=>{console.log(error)})
    }
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
          this.zone.run(()=>{

            if (!!gameState) {
              this.displayState = gameState.state;
              this.gameState = gameState;
            } 
            this.applicationRef.tick();
          })
        })
      }
    }catch(error){
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) { this.stateSubscription.unsubscribe() }
  }
}
