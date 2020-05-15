// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firestore";

import { Injectable, OnDestroy } from '@angular/core';
import { EmpireServiceModule } from './empire-service.module'
import { AngularFireDatabase } from '@angular/fire/database';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: EmpireServiceModule
})
export class EmpireService implements OnDestroy {
  RTDB :firebase.database.Database;

  constructor(private db: AngularFireDatabase) { 
    //firebase.initializeApp(environment.firebaseConfig);
    this.RTDB = firebase.database();
  }

  getResults(id:number){
    var dbList = `gameData/Empire/games/${id}/users`;

  }

  getGameState(id:number): Promise<any> {
    return new Promise((resolutionFunc,rejectionFunc) =>{
      this.RTDB.ref(`gameData/Empire/games/${id}/state`).once('value')
      .then((dataSnapshot)=>{
        var data = dataSnapshot.val();
        resolutionFunc( {
          canJoin: data === "accepting users",
          state: data
        })
      }).catch((error) => {
        rejectionFunc(error);
      });
    })
  }

  ngOnDestroy() {
    
  }
}
