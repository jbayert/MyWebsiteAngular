import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {EmpireService } from '../../empire-service/empire.service';
import { GetDomainService } from 'src/app/get-domain-service/get-domain.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-players-joined',
  templateUrl: './players-joined.component.html',
  styleUrls: ['./players-joined.component.scss']
})
export class PlayersJoinedComponent implements OnInit {
  curGameID:number;
  urlToJoin:string;

  @Input()
  set gameID(gameID: number){
    this.curGameID =  gameID;
    this.items = this.empireService.getPlayersJoined(this.curGameID);
  };
  items: Observable<any[]>;

  constructor(
    private empireService: EmpireService,
    private getDomainService: GetDomainService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.curGameID = null;
  }

  ngOnInit(): void {
    this.urlToJoin = this.getDomainService.getHostname();
    console.log(this.urlToJoin)
    console.log(this.document)
  }

  startGame(){
    this.empireService.advanceState(this.curGameID).then(()=>{})
    .catch((error)=>console.log(error));
  }

}
