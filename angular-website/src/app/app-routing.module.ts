import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { Page404Component } from './page404/page404.component';


const routes: Routes =[
  { path: 'user', component: LoginPageComponent },
  { path: 'login', redirectTo: '/user?tab=sign-in'},
  { path: 'register', redirectTo: '/user?tab=register'},
  { path: 'empire', loadChildren: () => import('./empire/empire.module').then(m => m.EmpireModule) },
  { path: '', component: HomeComponent }, 
  { path: '**', component: Page404Component}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
