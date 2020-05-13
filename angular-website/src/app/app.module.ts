import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './main/home/home.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from '../environments/environment';
import { LoginPageComponent } from './auth/login-page/login-page.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
