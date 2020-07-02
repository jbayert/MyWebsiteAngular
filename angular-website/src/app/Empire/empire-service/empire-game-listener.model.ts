// Add the Firebase services that you want to use
import "firebase/firestore";

import { GameState } from './empire-data.model'
import { BehaviorSubject, Observable } from 'rxjs';

class GameListener {
    private id: number
    private db: firebase.database.Database;

    private subject: BehaviorSubject<GameState | null>;
    private onValueChange: any;
    private ref: firebase.database.Reference;


    constructor(id: number, db: firebase.database.Database) {
        this.id = id;
        this.db = db
    }

    on(): Promise<any> {
        return new Promise((resFunc, rejFunc) => {
            if (!this.subject) {
                this.subject = new BehaviorSubject<GameState | null>(null);
                this.ref = this.db.ref(`gameData/Empire/games/${this.id}/state`);
                this.onValueChange = this.ref.on('value', (dataSnapshot) => {
                    var val = dataSnapshot.val()
                    console.log(`New value of "${val}" for the state of game ${this.id}`);
                    this.subject.next(new GameState(val));
                });
            }
            resFunc(`Listening to the state of ${this.id}`);
        })
    }

    off(): Promise<any> {
        return new Promise((resFunc, rejFunc) => {
            console.log(`Destroying game state listener for ${this.id}`);
            this.ref.off('value', this.onValueChange);
            resFunc("The value was added")
        })
    }

    getObservable(): Observable<GameState | null> {
        return this.subject.asObservable();
    }
}

export class GameStateListeners {
    private gameListeners;
    private db: firebase.database.Database;

    constructor(db: firebase.database.Database) {
        this.gameListeners = {}
        this.db = db
    }

    killListener(id: number): Promise<any> {
        var listener = this.getGameListener(id);
        if (listener) {
            return this.getGameListener(id).off();
        } else {
            return Promise.resolve(("The listener is already off"));
        }
    }

    getAsObservable(id: number): Observable<GameState> {
        var curListener = this.getGameListener(id);
        if (curListener) {
            return curListener.getObservable();
        } else {
            return null;
        }
    }

    killAll(): Promise<any> {
        return new Promise((resFunc, rejFunc) => {
            var promises = new Array();
            for (var key of Object.keys(this.gameListeners)) {
                promises.push(this.gameListeners.off());
            }
            Promise.all(promises).then(() => {
                resFunc("All listeners killed");
            }).catch((errors) => {
                rejFunc(errors);
            })
        })
    }

    private getGameListener(id: number): GameListener {
        return this.gameListeners[id];
    }

    add(id: number): Promise<any> {
        var listener: GameListener = this.getGameListener(id);
        if (listener) {
            return new Promise((resFunc, rejFunc) => { resFunc("added"); });
        } else {
            //add
            this.gameListeners[id] = new GameListener(id, this.db);
            return this.gameListeners[id].on();
        }

    }


}