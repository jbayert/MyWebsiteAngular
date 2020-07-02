import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Input()
  text:string;

  private eventSubscription: Subscription;
  @Input()
  showEvent:Observable<boolean>;

  timeout;
  _show:boolean;
  private show:boolean;
  async turnOn(show: boolean){
    if (show){
      if (this.timeout){
        clearTimeout(this.timeout);
      }
      this._show = true;
      this.timeout = setTimeout(()=>{ this._show = false }, 3000)
    }else{
      this._show = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.eventSubscription = this.showEvent.subscribe((show) => this.turnOn(show));
  }

  ngOnDestroy(){
    this.eventSubscription.unsubscribe();
  }
}
