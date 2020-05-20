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
          console.log("got Game State");
          resolutionFunc(new GameState(dataSnapshot.val()))
        }).catch((error) => {
          rejectionFunc(error);
        });
    })
  }

  private makeGuestId(length) {
    var result = 'guest_';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

  joinGame(newUser: UserProfile, guestID: boolean): Promise<any> {
    return new Promise((resFunc, rejFunc) => {
      console.log("Joining",!guestID);
      if(!guestID){
        var user = this.firebaseAuth.currentUser;
        if (user) {
          //there is a user logged in
          var toAddRef = this.RTDB.ref(`gameData/Empire/games/${newUser.gameID}/users/${user.uid}`);
          toAddRef.update({
            codename: newUser.codename,
            username: newUser.username
          },
          (error)=>{
            console.log("Error", error);
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
      }else{
        var id = this.makeGuestId(8);
        console.log(id);
        //there is a user logged in
        var toAddRed = this.RTDB.ref(`gameData/Empire/games/${newUser.gameID}/guests/${id}`);
        toAddRed.update({
          codename: newUser.codename,
          username: newUser.username
        },
        (error)=>{
          if (error){
            rejFunc(error);
          }else{
            resFunc("Guest Added");
          }
        });
      }
    })
  }

  ngOnDestroy() {

  }
}
