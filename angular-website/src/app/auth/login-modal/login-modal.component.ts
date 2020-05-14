import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, SimpleChange, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { authUIConfig } from '../auth-ui-config';


const TAB_INDEX = {
  "sign-in": 0,
  "register": 1
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginModalComponent implements OnInit {
  private eventsSubscription: Subscription;
  currTab: any;
  readonly authUIConfig = authUIConfig;

  modal:any;

  @Output() onSuccess: any;

  @ViewChild('content', { static: true }) content: ElementRef;

  @Input() set events(value: Observable<void>){
    if(value){
      if(this.eventsSubscription){
        this.eventsSubscription.unsubscribe();
      }
      this.eventsSubscription = value.subscribe(() => {
        console.log("Event Received");
        this.modal = this.modalService.open(this.content);
      });
    }

  }

  constructor(config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;

  }
  
  ngOnInit(): void {
    if((this.events)&&(!this.eventsSubscription)){
      this.eventsSubscription = this.events.subscribe(() => {
        console.log("Event Received")
      });
    }
    
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  setTab(tab){
    if ((tab == "sign-in")||(tab == TAB_INDEX["sign-in"])){this.currTab = TAB_INDEX["sign-in"]}
    else if ((tab == "register")||(tab == TAB_INDEX.register)){this.currTab = TAB_INDEX.register}
    else {this.currTab = TAB_INDEX["sign-in"]}
  }

  userLogedIn(event) {
    console.log(event);
    if (this.modal){
      this.modal.close("Finished");
    }
  }
}
