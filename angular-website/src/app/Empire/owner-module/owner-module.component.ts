import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';
import { ActivatedRoute } from '@angular/router';
import { GameStateOption, GameState } from '../empire-service/empire-data.model';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-owner',
  templateUrl: './owner-module.component.html',
  styleUrls: ['./owner-module.component.scss']
})
export class OwnerModuleComponent implements OnInit, OnDestroy {
  displayState: any;
  gameState:GameState;

  stateObservable: Observable<GameState>;
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

    console.log(theGameID);
    if (theGameID>0) {
      this.empireService.listenGameState(theGameID).then(async (observe) => {
        try {
          this.stateSubscription = await observe.subscribe();
          this.stateSubscription = observe.subscribe((gameState:GameState) => {
            if (!!gameState) {
              this.displayState = gameState.state;
              this.gameState = gameState;
            } else {
  
            }
            this.changeDetector.detectChanges();
          })
        } catch (error) {
        }
      }).catch(() => {
  
      })
    }

    this._gameID = theGameID;
    console.log(this._gameID);
  }

  constructor(private empireService: EmpireService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute) {
    this.displayState = 'loading';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      if (queryParams.get("gameID")) {
        this.gameID = +queryParams.get("gameID");
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) { this.stateSubscription.unsubscribe() }
  }
}
