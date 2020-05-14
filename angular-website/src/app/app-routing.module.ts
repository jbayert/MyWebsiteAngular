import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';


const routes: Routes =[
  { path: 'user', component: LoginPageComponent },
  { path: 'login', redirectTo: '/user?tab=sign-in'},
  { path: 'register', redirectTo: '/user?tab=register'},
  { path: '', component: HomeComponent },
  { path: 'empire', loadChildren: () => import('./empire/empire.module').then(m => m.EmpireModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
