import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginModalComponent implements OnInit {
  private eventsSubscription: Subscription;

  @ViewChild('content', { static: true }) content: ElementRef;

  @Input() set events(value: Observable<void>){
    if(value){
      if(this.eventsSubscription){
        this.eventsSubscription.unsubscribe();
      }
      this.eventsSubscription = value.subscribe(() => {
        console.log("Event Received");
        this.modalService.open(this.content);
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

  open(content) {
    this.modalService.open(content);
  }
}
