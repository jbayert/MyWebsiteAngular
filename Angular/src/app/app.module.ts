import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { LoginPageComponent } from './main/login-page/login-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

var firebaseConfig = {
  apiKey: "AIzaSyB270i-oNVZK78Hn2nC0Va42NFcXTm0aEA",
  authDomain: "party-games-ef841.firebaseapp.com",
  databaseURL: "https://party-games-ef841.firebaseio.com",
  projectId: "party-games-ef841",
  storageBucket: "party-games-ef841.appspot.com",
  messagingSenderId: "609024430601",
  appId: "1:609024430601:web:5821481043cec4ba60ded8",
  measurementId: "G-XSGCNK51BV"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig),
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
