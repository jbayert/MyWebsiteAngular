import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmpireService } from '../empire-service/empire.service';
import { UserProfile } from '../empire-service/empire-data.model';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  form: FormGroup;
  test: any;

  constructor(private empireService: EmpireService) {
    console.log(empireService);
    this.test = 5;
  };

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      codename: new FormControl('', Validators.required),
      gameID: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          this.empireService.gameIdRangeValidator]), 
        updateOn:'blur',
        asyncValidators:this.empireService.gameIdValidator
      })
    });
  }

  onSubmit(gameToJoin) {
    var newUser = new UserProfile(
      gameToJoin.username,
      gameToJoin.codename,
      gameToJoin.gameID);
    this.empireService.joinGame(newUser).then((value)=>{
      console.log(value);
    }).catch((error)=>{
      console.log(error);
    });
  }
}