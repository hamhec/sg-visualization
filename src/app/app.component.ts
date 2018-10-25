import { Component, ViewChild } from '@angular/core';

import {SgService} from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Statement Graphs';

  @ViewChild('fileImportInput') fileImportInput:any;

  kb:string = "[r1] bird(X), notFly(X) <- penguin(X).\n[r2] fly(X) <= bird(X).\n\npenguin(kowalski).\n\n! :- fly(X), notFly(X).\n\n% Does kowalski fly? query: fly(kowalski).";
  query:string = "fly(kowalski).";

  chosenSemantic:string = "BDLwithoutTD";


  semantics = [
    {name:"Ambiguity Blocking without Team Defeat", value: "BDLwithoutTD"},
    {name:"Ambiguity Blocking with Team Defeat", value: "BDLwithTD"},
    {name:"Ambiguity Propagating without Team Defeat", value: "PDLwithoutTD"},
    {name:"Ambiguity Propagating with Team Defeat", value: "PDLwithTD"}
  ];

  constructor(private sgService:SgService) {

  }

  build():void {
    this.sgService.build(this.kb).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  answerQuery():void {
    this.sgService.query(this.kb, this.query, this.chosenSemantic).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      let dlgp = reader.result;
      if(dlgp.substring(0,8) == "%Example") {
        dlgp = dlgp.substring(dlgp.indexOf("\n") + 1);
        this.query = dlgp.substring(1, dlgp.indexOf("\n"));
        this.kb = dlgp.substring(dlgp.indexOf("\n") +2);
      }
    }
  }

  clearKB():void {
    this.kb = "";
  }
  clearQuery():void {
    this.query = "";
  }
}
