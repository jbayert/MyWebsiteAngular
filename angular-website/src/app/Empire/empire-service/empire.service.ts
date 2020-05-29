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
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators'

import { GameState, GameStateOption, UserProfile } from './empire-data.model';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { GameStateListeners } from './empire-game-listener.model';

@Injectable({
  providedIn: EmpireServiceModule
})
export class EmpireService implements OnDestroy {
  RTDB: firebase.database.Database;
  firebaseAuth: firebase.auth.Auth;
  gameStateListeners: GameStateListeners;

  constructor(private auth: AngularFireAuth, private AngularDB: AngularFireDatabase) {
    this.RTDB = firebase.database();
    this.firebaseAuth = firebase.auth();
    this.gameStateListeners = new GameStateListeners(this.RTDB);
  }

  /**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * returns id the game state 
   * 
   */
  getGameState(id: number): Promise<GameState> {
    return new Promise((resolutionFunc, rejectionFunc) => {
      var listener = this.gameStateListeners.getAsObservable(id);
      if (!listener) {
        //pull data
        this.RTDB.ref(`gameData/Empire/games/${id}/state`).once('value')
          .then((dataSnapshot) => {
            console.log("got Game State");
            resolutionFunc(new GameState(dataSnapshot.val()))
          }).catch((error) => {
            rejectionFunc(error);
          });
      } else {
        //already have the state
        listener.pipe(first())
        .subscribe((gameState)=>{
          resolutionFunc(gameState);
        }
        );
      }
    })
  }

  public listenGameState(id: number): Promise<Observable<GameState>> {
    return new Promise(async (resFunc, rejFunc) => {
      var listener = this.gameStateListeners.getAsObservable(id);
      if (!listener) {
        //need to add it
        this.gameStateListeners.add(id).then(()=>{
          var test = this.gameStateListeners.getAsObservable(id);
          resFunc(test);
        });
      } else {
        //already have the listener
        resFunc( listener);
      }
    })
  }

  public stopListeningToGameState(id: number){
    this.gameStateListeners.killListener(id);
  }

  /**
   * creates a guest I
   * @param length how many charecters the the Id should be
   */
  private makeGuestId(length) {
    var result = 'guest_';
    //which ids are used
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * 
   */
  gameIdRangeValidator = (control: FormControl): ValidationErrors => {
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
    return new Promise(async (resolutionFunc, rejectionFunc) => {
      try{
        var gameState = await this.getGameState(+control.value);
        if (gameState.canJoin) {
          resolutionFunc(null);
        } else {
          resolutionFunc({ invalidID: "Invalid Game ID" });
        }
      }
      catch(error) {
        resolutionFunc({ invalidID: "Invalid Game ID" });
      }
    })
  }

  /**
   * Adds a users to the game
   * @param newUser the user to be added  
   * @param guestID 
   */
  joinGame(newUser: UserProfile, guestID: boolean): Promise<any> {
    return new Promise((resFunc, rejFunc) => {
      if (!guestID) {
        var user = this.firebaseAuth.currentUser;
        if (user) {
          //there is a user logged in
          var toAddRef = this.RTDB.ref(`gameData/Empire/games/${newUser.gameID}/users/${user.uid}`);
          toAddRef.update({
            codename: newUser.codename,
            username: newUser.username
          },
            (error) => {
              if (error) {
                rejFunc(error);
              } else {
                resFunc("Player Added");
              }
            });
        } else {
          //no user logged in
          rejFunc("No User Signed In");
        }
      } else {
        var id = this.makeGuestId(8);
        console.log(id);
        //there is a user logged in
        var toAddRed = this.RTDB.ref(`gameData/Empire/games/${newUser.gameID}/guests/${id}`);
        toAddRed.update({
          codename: newUser.codename,
          username: newUser.username
        },
          (error) => {
            if (error) {
              rejFunc(error);
            } else {
              resFunc("Guest Added");
            }
          });
      }
    })
  }

  createGame(timeoutMS: number = 5000, timeoutNum: number = 10): Promise<number | null> {
    return new Promise((resFunc, rejFunction) => {
      if (timeoutNum < 0) {
        rejFunction({ reason: "Recursion Timeout." });
      }

      //set up Timeout
      var timeoutPromis = setTimeout(() => {
        rejFunction({ reason: 'Timed out in ' + timeoutMS + 'ms.' });
      }, timeoutMS)


      var user = this.firebaseAuth.currentUser;
      if (user) {
        var id = this.getRandomInt(EmpireConfig.gameIdRange.minID, EmpireConfig.gameIdRange.maxID);

        var testGameID = this.RTDB.ref(`gameData/Empire/games/${id}/roles`);
        testGameID.transaction((currentData) => {
          if (currentData === null) {
            var data = {};
            data[user.uid] = "owner";
            return data;
          } else {
            return;
          }
        }, (error, committed, snapshot) => {
          if (error) {
            //raise an error
            rejFunction(error);
          } else if (committed) {
            //finish created the game
            var testGameID = this.RTDB.ref(`gameData/Empire/games/${id}/state`);
            testGameID.set(GameStateOption.acceptingUsers).then((value) => {
              //add timestamp
              var testGameID = this.RTDB.ref(`gameData/Empire/games/${id}/timestamp`);
              testGameID.set(new Date().getTime()).then((value) => {
                //add state listener
                this.listenGameState(id);
                resFunc(id);
              }).catch((state_error) => {
                rejFunction({ reason: "Error Updating State", error: state_error })
              });
            }).catch((state_error) => {
              rejFunction({ reason: "Error Updating State", error: state_error })
            });
          } else {
            //Id already taken
            this.createGame(timeoutMS, timeoutNum - 1).then((id) => {
              resFunc(id);
            }).catch((error) => {
              rejFunction(error);
            })
          }
        })
      } else {
        rejFunction("User Not Logged in");
      }

    })
  }

  
  shuffle_usernames(id: number): Promise<any> {
    return new Promise((resFunc, rejFunc) => {
      var toAddRef = this.RTDB.ref(`gameData/Empire/games/${id}/startRand`);
      toAddRef.set(true,
        (error) => {
          if (error) {
            rejFunc(error);
          } else {
            console.log("Names Shuffled");
            resFunc("Names shuffled");
          }
        });
      });
    }
    
    set_state(id: number, state: GameState): Promise<any> {
    return new Promise((resFunc, rejFunc) => {
      var toAddRef = this.RTDB.ref(`gameData/Empire/games/${id}/state`);
      toAddRef.set(state.state,
        (error) => {
          if (error) {
            rejFunc(error);
          } else {
            if (state.state === GameStateOption.playing) {
              this.shuffle_usernames(id).then(() => {
                resFunc(`State Updated to ${state}`);
              }).catch((error) => {
                rejFunc(error);
              })
            }
            resFunc(`State Updated to ${state}`);
          }
        });
      });
    }
    
    advance_state(id: number): Promise<any> {
      return new Promise((resFunc, rejFunc) => {
        this.getGameState(id).then((gameState) => {
          switch (gameState.state) {
            case (GameStateOption.acceptingUsers): {
              this.set_state(id, new GameState(GameStateOption.playing))
              .then((result) => { resFunc(result) })
              .catch((error) => { rejFunc(error) })
              break;
          }
          case (GameStateOption.playing): {
            this.set_state(id, new GameState(GameStateOption.finished))
            .then((result) => { resFunc(result) })
            .catch((error) => { rejFunc(error) })
            break;
          }
          case (GameStateOption.finished): {
            rejFunc("The game could not be updated because it is already finished");
            break;
          }
          default: {
            rejFunc("The state could not be updated.");
          }
        }
      })
    })
  }
  
  getPlayersJoined(id: number): Observable<any> {
    var dbList = this.AngularDB.list(`gameData/Empire/games/${id}/usernames`);
    return dbList.valueChanges();
  }

  

  ngOnDestroy() {
    this.gameStateListeners.killAll();
  }
}
