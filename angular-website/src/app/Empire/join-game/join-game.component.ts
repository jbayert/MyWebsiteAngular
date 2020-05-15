import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { EmpireService } from '../empire-service/empire.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit{
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      codename: new FormControl('', Validators.required),
      gameID: new FormControl('',Validators.compose([ 
        Validators.required,
        this.gameIdValidator]))
    });
  }

  constructor(private empireService:EmpireService){

    };


  gameIdValidator(control: FormControl){
    const gameID = parseInt(control.value, 10 );
    const minID = 10000;//inclusive
    const maxID = 99999;
    if (gameID>= minID && gameID <= maxID){
      return null;
    }else{
      return {idOutOfRange: {
        min: minID,
        max: maxID
      }};
    }
  }

  onSubmit(gameToJoin) {
    console.log(gameToJoin);
  }
}