import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {EmpireService } from '../../empire-service/empire.service';

@Component({
  selector: 'app-players-joined',
  templateUrl: './players-joined.component.html',
  styleUrls: ['./players-joined.component.scss']
})
export class PlayersJoinedComponent implements OnInit {
  curGameID:number;
  
  @Input()
  set gameID(gameID: number){
    this.curGameID =  gameID;
    this.items = this.empireService.getPlayersJoined(this.curGameID);
  };
  items: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private empireService: EmpireService
  ) {
    this.curGameID = null;
  }

  ngOnInit(): void {

  }

  startGame(){
    this.empireService.advanceState(this.curGameID).then(()=>{})
    .catch((error)=>console.log(error));
  }

}
