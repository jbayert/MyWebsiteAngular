import { Component, OnInit } from '@angular/core';
import '@angular/material/prebuilt-themes/indigo-pink.css';
import { authUIConfig } from '../auth-ui-config';
import { ActivatedRoute, Router } from '@angular/router';


const TAB_INDEX = {
  "sign-in": 0,
  "register": 1
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss' ]
})
export class LoginPageComponent implements OnInit {
  currTab: any;

  readonly authUIConfig = authUIConfig;

  constructor(private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    //this.setTab(this.route.snapshot.queryParamMap.get("tab"));
    this.route.queryParamMap.subscribe(queryParams  => {
      this.setTab(queryParams.get("tab")); 
   });
  }

  setTab(tab){
    if ((tab == "sign-in")||(tab == TAB_INDEX["sign-in"])){this.currTab = TAB_INDEX["sign-in"]}
    else if ((tab == "register")||(tab == TAB_INDEX.register)){this.currTab = TAB_INDEX.register}
    else {this.currTab = TAB_INDEX["sign-in"]}
  }

  loggedInCallback(event){
    let  returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    if (returnUrl){
      this.router.navigate([returnUrl],{replaceUrl:true});
    }
  }
}
