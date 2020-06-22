import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { EmpireService } from 'src/app/empire/empire-service/empire.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private empireService: EmpireService,
    private router: Router) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resFunc, rejFunc) => {
      console.log("login Guard Called");
      if (await this.empireService.currentUser()) {
        // logged in so return true
        resFunc(true);
      } else {
        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['user'], { queryParams: {tab:"register", returnUrl: state.url } });
        resFunc(false);
      }
    })
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return new Promise(async (resFunc, rejFunc) => {
      console.log("login Guard Called");
      if (await this.empireService.currentUser) {
        // logged in so return true
        resFunc(true);
      } else {
        resFunc(false);
      }
    })  
  }

}
