import { Component, OnInit, Input } from '@angular/core';
import { EmpireService } from '../../empire-service/empire.service';

@Component({
  selector: 'app-list-code-names',
  templateUrl: './list-code-names.component.html',
  styleUrls: ['./list-code-names.component.scss']
})
export class ListCodeNamesComponent implements OnInit {

  delayLength: number;


  @Input()
  isMonitor:boolean = false;

  @Input()
  gameID: number;

  startButtonShown: boolean;
  nameShown: string;
  spinnerShown: boolean;

  codeNames;

  constructor(private empireService: EmpireService,) {
    this.spinnerShown = true;
    this.delayLength = 3000;
    this.startButtonShown = false;
  }

  ngOnInit(): void {
    this.empireService.getCodename(this.gameID).then((response) => {
      this.codeNames = response;
      this.spinnerShown = false;
      this.startButtonShown = true;
    }).catch((error) => { console.log(error) });
  }

  startBtn() {
    this.startButtonShown = false;
    this.listCodenames().then(() => {
      this.startButtonShown = true;

    })
  }

  listCodenames() {
    return new Promise(async (resFunc, rejFunc) => {
      for (var key of Object.keys(this.codeNames)) {
        //console.log(`The next codename is ${this.codeNames[key]}`)
        this.nameShown = this.codeNames[key];
        await this.sleeper(this.delayLength);
      }
      this.nameShown = "";
      this.startButtonShown = true;
      resFunc("Names Finished");
    })
  }

  sleeper(ms): Promise<any> {
    return new Promise(resolve => setTimeout(() => resolve(ms), ms));
  }

  finishGameBtn(){
    this.empireService.advanceState(this.gameID);
  }

}