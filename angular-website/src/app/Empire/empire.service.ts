import { Injectable } from '@angular/core';
import { EmpireServiceModule } from './empire-service.module'
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: EmpireServiceModule
})
export class EmpireService {

  constructor(private db: AngularFireDatabase) { }

  getResults(id:number){
    var dbList = `gameData/Empire/games/${id}/users`;
  }

  gameActive(id:number): boolean{
    this.db.object('gameData/Empire/games/100/state').
    console.log()
    return false;
  }
}
