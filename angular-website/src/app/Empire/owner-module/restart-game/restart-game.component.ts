import { Component, OnInit, Input } from '@angular/core';
import { EmpireService } from '../../empire-service/empire.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restart-game',
  templateUrl: './restart-game.component.html',
  styleUrls: ['./restart-game.component.scss']
})
export class RestartGameComponent implements OnInit {
  @Input()
  gameID:number;

  constructor(private empireService:EmpireService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  restartGame(event){
    console.log("Test")
    this.empireService.restartGame(this.gameID)
    .then((newGameID)=>{
      console.log(newGameID)
      this.router.navigate([],{
        relativeTo:this.activatedRoute,
        queryParams: {gameID:newGameID},
        queryParamsHandling: 'merge',
      })
    }).catch((error)=>{
      console.log(error)
    })

  }
}
