


/**
 * the state machine for the game options
 */
export enum GameStateOption {
    acceptingUsers="accepting users",
    playing="playing" ,
    finished="finished",
}


/**
 * The game state variable
 * 
 * See {@link EmpireService} for the service
 */
export class GameState {
    /**
     * what the current state of the game is
     * 
     * The options are 
     * accepting_users, playing, finished
     */
    state: GameStateOption;
    
    /**
     * whether a game is currently accepting users
     */
    get canJoin(): boolean {
        return this.state === GameStateOption.acceptingUsers;
    }

    get stateString():string|null  {
        return <string> this.state;
    }

    setStatebyString(stateString:string):GameStateOption|null {
        switch(stateString){
            case "accepting users":{
                this.state = GameStateOption.acceptingUsers
                break;
            }
            case "playing":{
                this.state = GameStateOption.playing;
                break;
            }
            case "finished":{
                this.state = GameStateOption.finished;
                break;
            }
            default:{
                return null;
            }
        }
        return this.state;
    }


    /**
     * 
     * @param state 
     */
    constructor(state: GameStateOption|string){
        if (typeof state === "string" ){
            this.setStatebyString(state);
        }else{
            this.state = state;
        }
    }
}


/**
 * The user profile variable
 * 
 * See {@link EmpireService} for the service
 */

export class UserProfile {
    username: string;
    codename: string;
    gameID: number;

    constructor(username:string,codename:string,gameID:any){
        this.username = username;
        this.codename = codename;
        this.gameID = +gameID;
    }
}
