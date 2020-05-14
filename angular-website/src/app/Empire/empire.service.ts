import { Injectable } from '@angular/core';
import { EmpireModule } from './empire.module'

@Injectable({
  providedIn: EmpireModule
})
export class EmpireService {

  constructor() { }

  getResults(id:number){
    var dbList = `gameData/Empire/games/${id}/users`;
    return 
  }
}
