import { Component, ViewChild, OnInit, HostBinding } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { OverlayContainer} from '@angular/cdk/overlay';

import {SgService, KnowledgeBase} from './shared';

import {AgentDialogComponent} from './dialog-boxes/agent-dialog/agent-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Statement Graphs';
  @HostBinding('class') componentCssClass;

  @ViewChild('fileImportInput') fileImportInput:any;


  KBs: KnowledgeBase[] = [
    {
      source: 'Common',
      selected: true,
      locked: false,
      type: 'common',
      dlgp: "[r1] bird(X), notFly(X) <- penguin(X).\n [r2] fly(X) <= bird(X).\n\n penguin(kowalski).\n\n ! :- fly(X), notFly(X)."
    }
  ];

  query:string = "fly(kowalski). notFly(kowalski).";

  chosenSemantic:string = "BDLwithoutTD";


  semantics = [
    {name:"Ambiguity Blocking without Team Defeat", value: "BDLwithoutTD"},
    {name:"Ambiguity Blocking with Team Defeat", value: "BDLwithTD"},
    {name:"Ambiguity Propagating without Team Defeat", value: "PDLwithoutTD"},
    {name:"Ambiguity Propagating with Team Defeat", value: "PDLwithTD"}
  ];

  constructor(private sgService:SgService, private dialog: MatDialog,
  public overlayContainer: OverlayContainer) {
    this.componentCssClass="light-theme";
  }

  ngOnInit() {
  }

  setTheme() {
    let lightTheme:string = 'light-theme';
    let darkTheme:string = 'dark-theme';
    if(this.componentCssClass === lightTheme) {
      this.componentCssClass = darkTheme;
      this.overlayContainer.getContainerElement().classList.remove(lightTheme);
      this.overlayContainer.getContainerElement().classList.add(darkTheme);
    } else {
      this.componentCssClass = lightTheme;
      this.overlayContainer.getContainerElement().classList.remove(darkTheme);
      this.overlayContainer.getContainerElement().classList.add(lightTheme);
    }
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

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      let json = JSON.parse(reader.result);
      this.KBs = json.KBs;
      this.query = json.query;
    }
  }

  trackAgentsBy(index, kb) {
    return index;
  }

  openAgentDialog(kb:KnowledgeBase) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    if(kb) {
      dialogConfig.data = {
        name: kb.source
      }
    }
    const dialogRef = this.dialog.open(AgentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        if(kb) {
          kb.source = data.name;
        } else {
          const addKB = new KnowledgeBase();
          addKB.source = data.name;
          this.KBs.push(addKB);
        }
      }
    })
  }
}
