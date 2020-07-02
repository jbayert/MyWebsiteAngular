import { Injectable } from '@angular/core';
import { EmpireServiceModule } from './empire-service.module'
import { Router, Route } from '@angular/router';

@Injectable({
  providedIn: EmpireServiceModule
})
export class RouteAssistanceService {

  constructor(
    private router: Router,
    private route: Route
  ) { 
  }
}
