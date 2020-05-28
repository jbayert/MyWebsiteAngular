import { Component, OnInit } from '@angular/core';
import { EmpireService } from '../empire-service/empire.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  spinnerShown: boolean;
  joinAlso: string;
  canJoinOptions = {
    yes:"Yes",
    no:"No"
  }
  options:string[];

  constructor(private empireService: EmpireService,
    private router:Router,
    private route:ActivatedRoute) {
    this.options = [];
    for(var key in this.canJoinOptions){
      this.options.push(this.canJoinOptions[key]);
    }
    this.spinnerShown = false;
   }

  ngOnInit(): void {
  }

  createGameCallback(): void{
    this.spinnerShown = true;
    this.empireService.createGame().then((id)=>{
      console.log(id);
      this.router.navigate(['../players-joined'], { relativeTo: this.route, queryParams: {gameID: id }})
    }).catch((error)=>{
      console.log(error);
      this.spinnerShown = false;
    });
  }
}
