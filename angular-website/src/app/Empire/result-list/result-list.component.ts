import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  private _gameID:number;

  get gameID():number{
    return this._gameID
  }

  @Input()
  set gameID(gameID: number){
    this._gameID =  gameID;
    let listen = this.empireService.getAllUsers(this._gameID);
    listen.then((data)=>{
      this.items =  data;
      this.changeDetector.detectChanges();
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  items: any[];

  constructor(private empireService:EmpireService,
    private changeDetector: ChangeDetectorRef,) {
      this.items = [];
   }

  ngOnInit(): void {
  }

}
