import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {EmpireService } from '../../empire-service/empire.service';
import { GetDomainService } from 'src/app/get-domain-service/get-domain.service';
import { EmpireConfig } from '../../empire-config';


@Component({
  selector: 'app-players-joined',
  templateUrl: './players-joined.component.html',
  styleUrls: ['./players-joined.component.scss']
})
export class PlayersJoinedComponent implements OnInit {
  curGameID:number;
  joinUrl:string;
  joinUrlwithID:string;

  @Input()
  isMonitor:boolean = false;

  @Input()
  set gameID(gameID: number){
    this.curGameID =  gameID;
    this.items = this.empireService.getPlayersJoined(this.curGameID);
  };
  items: Observable<any[]>;

  constructor(
    private empireService: EmpireService,
  ) {
    this.curGameID = null;
  }

  ngOnInit(): void {
    this.joinUrl = EmpireConfig.joinUrl;
    this.joinUrlwithID = EmpireConfig.joinUrl + `?gameID=${this.curGameID}`
  }

  startGame(){
    this.empireService.advanceState(this.curGameID).then(()=>{})
    .catch((error)=>console.log(error));
  }

}
