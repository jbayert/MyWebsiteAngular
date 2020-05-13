import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginPageComponent } from './auth/login-page/login-page.component'


const routes: Routes =[
  { path: 'user', component: LoginPageComponent },
  { path: 'login', redirectTo: '/user?tab=sign-in'},
  { path: 'register', redirectTo: '/user?tab=register'},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
