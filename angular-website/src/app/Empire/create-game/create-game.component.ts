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

  constructor(private empireService: EmpireService,
    private router:Router) {
    this.spinnerShown = false;
   }

  ngOnInit(): void {
    this.createGame();
  }

  createGame(): void{
    this.spinnerShown = true;
    this.empireService.createGame().then((id)=>{
      console.log(id);
      this.router.navigate(['empire/owner'], { queryParams: {gameID: id }, replaceUrl:true})
    }).catch((error)=>{
      console.log(error);
      this.spinnerShown = false;
    });
  }
}
