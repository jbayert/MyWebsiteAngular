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
      console.log(next.data)
      if (await this.empireService.currentUser()) {
        // logged in so return true
        resFunc(true);
      } else {
        console.log(next.data.redirectTo)
        if (next.data.redirectTo){
          this.router.navigate([next.data.redirectTo], );
        }else{
          // not logged in so redirect to login page with the return url and return false
          this.router.navigate(['user'], { queryParams: {tab:"register", returnUrl: state.url } });
        }
        resFunc(false);
      }
    })
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return new Promise(async (resFunc, rejFunc) => {
      console.log("login Guard Called");
      console.log(route);
      console.log(segments);
      if (await this.empireService.currentUser) {
        // logged in so return true
        resFunc(true);
      } else {
        this.router.navigate(['user'], { queryParams: {tab:"register", returnUrl: "test" } });
        resFunc(false);
      }
    })  
  }

}
