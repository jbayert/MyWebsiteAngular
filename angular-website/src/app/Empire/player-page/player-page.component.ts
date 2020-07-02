import { Component, OnInit, OnDestroy, ApplicationRef, NgZone } from '@angular/core';
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
    private route: ActivatedRoute,
    private router:Router,
    private zone:NgZone,
    private applicationRef:ApplicationRef) {
    
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
          this.zone.run(()=>{

            if (!!gameState) {
              this.displayState = gameState.state;
              this.gameState = gameState;
            } 
            this.applicationRef.tick();
          }
          )
        })
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

  async joinNextGame(){
    try{
      var nextID = await this.empireService.getNextGame(this.gameID);
      this.router.navigate(['../join'],{relativeTo:this.route,queryParams:{gameID:nextID}})
    }catch(error){
      console.error(error)
    }
  }
}
