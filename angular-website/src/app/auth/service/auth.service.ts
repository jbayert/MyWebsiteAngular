import { Injectable } from '@angular/core';
import { EmpireService } from 'src/app/empire/empire-service/empire.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(public empireService: EmpireService) { }
}
