import { Component, ViewChild, OnInit } from '@angular/core';


import {SgService, KnowledgeBase} from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Statement Graphs';

  KBs: KnowledgeBase[] = [
    {
      source: 'Pierre',
      dlgp: `weather(sunny) <= .
terrace(entrecote) <= .
noTerrace(indian) <= .

X > Y <- weather(sunny), terrace(X), noTerrace(Y).

cheap(indian), vegetarian(indian) <= .
expensive(entrecote), notVegetarian(entrecote) <= .

X > Y <- vegetarian(X), notVegetarian(Y).

! :- cheap(X), expensive(X).
! :- terrace(X), noTerrace(X).
! :- weather(sunny), notWeather(sunny).
! :- vegetarian(X), notVegetarian(X).`
},
  {
      source: 'Raouf',
      dlgp: `notWeather(sunny) <= .
X > Y <- cheap(X), expensive(Y).`
  }
  ];

  query:string = "entrecote > indian. indian > entrecote.";

  chosenSemantic:string = "BDLwithoutTD";


  semantics = [
    {name:"Ambiguity Blocking without Team Defeat", value: "BDLwithoutTD"},
    {name:"Ambiguity Blocking with Team Defeat", value: "BDLwithTD"},
    {name:"Ambiguity Propagating without Team Defeat", value: "PDLwithoutTD"},
    {name:"Ambiguity Propagating with Team Defeat", value: "PDLwithTD"}
  ];

  constructor(private sgService:SgService) {

  }

  ngOnInit() {
    console.log(this.KBs);
  }

  build(kb:KnowledgeBase):void {
    this.sgService.build(kb.dlgp).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  answerQuery():void {
    let kb:string = "";
    this.KBs.forEach(k => {
      kb += k.dlgp;
    });
    this.sgService.query(kb, this.query, this.chosenSemantic).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  clearQuery():void {
    this.query = "";
  }

  trackAgentsBy(index, kb) {
    return kb.source;
  }
}
