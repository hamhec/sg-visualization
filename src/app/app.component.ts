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
      source: 'Common',
      selected: true,
      locked: false,
      type: 'common',
      dlgp: "terrace(entrecote) <- .\n noTerrace(indian) <- .\n ! :- cheap(X), expensive(X).\n ! :- terrace(X), noTerrace(X).\n ! :- weather(X), notWeather(X).\n ! :- vegetariant(X), notVegetarian(X)."
    },
    {
      source: 'Pierre',
      selected: true,
      locked: false,
      type: '',
      dlgp: "weather(sunny) <= .\n X > Y <- weather(sunny), terrace(X), noTerrace(Y).\n cheap(indian), vegetarian(indian) <= .\n expensive(entrecote), notVegetarian(entrecote) <= .\n X > Y <- vegetarian(X), notVegetarian(Y)."
},
  {
      source: 'Raouf',
      selected: true,
      locked: false,
      type: '',
      dlgp: "notWeather(sunny) <= .\n X > Y <- cheap(X), expensive(Y).\n cheap(indian), expensive(entrecote) <= ."
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

  build():void {
    let kb:string = "";
    this.KBs.forEach(k => {
      if(k.selected) {
        kb += k.dlgp;
      }
    });
    this.sgService.build(kb).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  answerQuery():void {
    let kb:string = "";
    this.KBs.forEach(k => {
      if(k.selected) {
        kb += k.dlgp;
      }
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
