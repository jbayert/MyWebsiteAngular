
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
    state: string;
    
    /**
     * whether a game is currently accepting users
     */
    get canJoin(): boolean {
        return this.state === "accepting users";
    }

    /**
     * 
     */
    constructor(state: string){
        this.state = state;
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