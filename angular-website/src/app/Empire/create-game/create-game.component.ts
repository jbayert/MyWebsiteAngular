import { Component, OnInit } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  constructor(private empireService: EmpireService ) { }

  ngOnInit(): void {
  }

  createGameCallback(): void{
    this.empireService.createGame().then((id)=>{
      console.log(id);
    }).catch((error)=>{
      console.log(error);
    });
  }
}
