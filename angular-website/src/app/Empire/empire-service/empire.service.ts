// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firestore";

import { Injectable, OnDestroy } from '@angular/core';
import { EmpireServiceModule } from './empire-service.module'
import { AngularFireDatabase } from '@angular/fire/database';
import { EmpireConfig } from '../empire-config';

import { AngularFireAuth } from '@angular/fire/auth';

import { GameState, UserProfile } from './empire-data.model';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: EmpireServiceModule
})
export class EmpireService implements OnDestroy {
  RTDB: firebase.database.Database;
  firebaseAuth: firebase.auth.Auth;

  constructor(public auth: AngularFireAuth) {
    //firebase.initializeApp(environment.firebaseConfig);
    console.log("Start service");
    console.log(this);
    this.RTDB = firebase.database();
    this.firebaseAuth = firebase.auth();
  }

  getResults(id: number) {
    var dbList = `gameData/Empire/games/${id}/users`;

  }

  testGameState(id: number): Promise<GameState> {
    return new Promise((resolutionFunc, rejectionFunc) => {
      this.RTDB.ref(`gameData/Empire/games/${id}/state`).once('value')
        .then((dataSnapshot) => {
          resolutionFunc(new GameState(dataSnapshot.val()))
        }).catch((error) => {
          rejectionFunc(error);
        });
    })
  }

  gameIdRangeValidator = (control: FormControl):ValidationErrors => {
    const gameID = parseInt(control.value, 10);
    const minID = EmpireConfig.gameIdRange.minID;//inclusive
    const maxID = EmpireConfig.gameIdRange.maxID;
    if (gameID >= minID && gameID <= maxID) {
      return null;
    } else {
      return {
        idOutOfRange: {
          min: minID,
          max: maxID
        }
      };
    }
  }

  /**
   * returns if a game is valid for control
   */
  gameIdValidator = (control: AbstractControl): Promise<ValidationErrors | null> => {
    console.log("gameIdValidator");
    return new Promise((resolutionFunc, rejectionFunc) => {
      this.testGameState(+control.value).then((gameState) => {
        if (gameState.canJoin) {
          resolutionFunc(null);
        } else {
          resolutionFunc({ invalidID: "Invalid Game ID" });
        }
      }).catch((error) => {
        resolutionFunc({ invalidID: "Invalid Game ID" });
      });
    })
  }

  joinGame(newUser: UserProfile): Promise<any> {
    return new Promise((resFunc, rejFunc) => {
      var user = this.firebaseAuth.currentUser;
      if (user) {
        //there is a user logged in
        var toAddRef = this.RTDB.ref(`gameData/Empire/games/${newUser.gameID}/users/${user.uid}`).update({
          codename: newUser.codename,
          username: newUser.username
        },
        (error)=>{
          if (error){
            rejFunc(error);
          }else{
            resFunc("Player Added");
          }
        });
      } else {
        //no user logged in
        rejFunc("No User Signed In");
      }
    })
  }

  ngOnDestroy() {

  }
}
