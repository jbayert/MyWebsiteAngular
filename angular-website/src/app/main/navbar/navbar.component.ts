import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  emitEventToChild() {
    console.log("Call Event")
    this.eventsSubject.next();
  }

}
