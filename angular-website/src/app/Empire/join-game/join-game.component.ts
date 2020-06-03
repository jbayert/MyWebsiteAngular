import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmpireService } from '../empire-service/empire.service';
import { UserProfile } from '../empire-service/empire-data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  form: FormGroup;
  test: any;
  guestID: boolean;
  submitEnabled: boolean;

  constructor(private empireService: EmpireService,
    private route: ActivatedRoute) {
    console.log(empireService);
    this.test = 5;
    this.submitEnabled = true;
  };

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      codename: new FormControl('', Validators.required),
      gameID: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          this.empireService.gameIdRangeValidator]),
        updateOn: 'blur',
        asyncValidators: this.empireService.gameIdValidator
      })
    });

    this.guestID = false;
    this.route.queryParamMap.subscribe(queryParams => {
      console.log("Query")
      console.log((!!queryParams.get("guestID")) && (queryParams.get("guestID") != "false"))

      this.guestID = (!!queryParams.get("guestID")) && (queryParams.get("guestID") != "false");
      if (queryParams.get("gameID")) {
        this.form.get("gameID").setValue(+queryParams.get("gameID"));
      }
    });
  }

  onSubmit(gameToJoin) {
    var newUser = new UserProfile(
      gameToJoin.username,
      gameToJoin.codename,
      gameToJoin.gameID);
    this.submitEnabled = false;
    this.empireService.joinGame(newUser, this.guestID).then((value) => {
      console.log(value);
      this.form.get('username').setValue('');
      this.form.get('codename').setValue('');
      this.form.get('username').markAsPristine();
      this.form.get('codename').markAsPristine();
      this.submitEnabled = true;
    }).catch((error) => {
      console.log(error);
      this.submitEnabled = true;
    });
  }

  get submitBtnText(): string {
    if (!this.guestID) { return "Join Game" }
    else { return "Join as guest" }
  }

}