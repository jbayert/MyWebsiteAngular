import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmpireService } from '../empire-service/empire.service';
import { UserProfile } from '../empire-service/empire-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDomainService } from 'src/app/get-domain-service/get-domain.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  form: FormGroup;
  guestID: boolean;
  submitEnabled: boolean;
  gameIDfromQuery:number;

  snackbarText:string = "Hello";
  showSnackbarSubject:Subject<boolean> = new Subject<boolean>();

  constructor(private empireService: EmpireService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.submitEnabled = true;
    this.guestID = false;
  };

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', {validators: Validators.required, 
        updateOn:'change'}),
      codename: new FormControl('', {validators: Validators.required, 
        updateOn:'change'}),
      gameID: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          this.empireService.gameIdRangeValidator]),
        updateOn: 'blur',
        asyncValidators: this.empireService.gameIdValidator
      })
    });
    
    this.guestID = false;
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log("Query")
      if (queryParams.get("gameID")) {
        this.form.get("gameID").setValue(+queryParams.get("gameID"));
      }
    }); 
    this.activatedRoute.data.subscribe((data)=>{
      this.guestID = data.guestID;
    })
  }

  onSubmit(gameToJoin) {
    var newUser = new UserProfile(
      gameToJoin.username,
      gameToJoin.codename,
      gameToJoin.gameID);
    this.submitEnabled = false;
    this.empireService.joinGame(newUser, this.guestID).then((value) => {
      if(this.guestID){
        console.log(value);
        let name = this.form.get('username').value;
        this.form.get('username').setValue('');
        this.form.get('codename').setValue('');
        this.form.get('username').markAsPristine();
        this.form.get('codename').markAsPristine();
        this.submitEnabled = true;

        //snackbar
        this.snackbarText = `${name} was added.`
        this.showSnackbarSubject.next(true);
      }else{
        this.switchToPlayerTab();
        //this.router.navigate(['../player'],{relativeTo: this.activatedRoute,queryParams:{gameID:gameToJoin.gameID }})
      }
    }).catch((error) => {
      console.log(error);
      this.submitEnabled = true;
    });
  }

  switchToPlayerTab(){
    if (!this.form.get('gameID').errors){
      let gameID = this.form.get('gameID').value
      this.router.navigate(['../player'],{relativeTo: this.activatedRoute,queryParams:{gameID: gameID }})

    }
  }

  get submitBtnText(): string {
    if (!this.guestID) { return "Join Game" }
    else { return "Join as guest" }
  }

}