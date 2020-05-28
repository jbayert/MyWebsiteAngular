import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {EmpireService } from '../empire-service/empire.service';
import { GameState, GameStateOption } from '../empire-service/empire-data.model';

@Component({
  selector: 'app-players-joined',
  templateUrl: './players-joined.component.html',
  styleUrls: ['./players-joined.component.scss']
})
export class PlayersJoinedComponent implements OnInit {
  gameID: number;
  items: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private empireService: EmpireService
  ) {
    
   }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.get("gameID")) {
        this.gameID = +queryParams.get("gameID");
        this.items = this.empireService.getPlayersJoined(this.gameID);
      }
    });
  }

  startGame(){
    this.empireService.advance_state(this.gameID);
  }

}
