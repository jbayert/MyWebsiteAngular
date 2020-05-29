//TODO: remove

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector:'empire-list',
    templateUrl: './empire-list.component.html',
    styleUrls: [
        './empire-list.component.css'
    ]
})
export class EmpireListComponent{
    users = [ {codename:"Jon",username:"Bob"},
    {codename:"Jon1",username:"Bob1"},
    {codename:"Jon2",username:"Bob"}
    ];

    items: Observable<any[]>;
    
    @Input()
    set game_id(game_id:number){

    }

    dbList;
    constructor(db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute) {

        this.activatedRoute.queryParams
            .subscribe(params => {
            this.game_id = params['id'];
            if(this.game_id){
                this.dbList = `gameData/Empire/games/${this.game_id}/users`;
                console.log(`Subscribing to ${this.dbList}`); // Print the colection. 
                this.items = db.list(this.dbList).valueChanges();
                this.items.subscribe(x => console.log(x));
            }
          });
    }
}