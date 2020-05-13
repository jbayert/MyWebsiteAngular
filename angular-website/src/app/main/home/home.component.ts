import { Component, OnInit } from '@angular/core';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginModalComponent } from 'src/app/auth/login-modal/login-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
