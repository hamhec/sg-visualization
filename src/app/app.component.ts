import { Component, ViewChild, OnInit, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { OverlayContainer} from '@angular/cdk/overlay';

import {SgService, KnowledgeBase, Project} from './shared';

import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';


import {AgentDialogComponent} from './dialog-boxes/agent-dialog/agent-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Damn! Defeasible Reasoning using Statement Graphs';
  agent:string = "";
  connected:boolean = false;

  private collaborationSubscriptions: Subscription[] = [];

  @HostBinding('class') componentCssClass;

  @ViewChild('fileImportInput') fileImportInput:any;

  project: Project = new Project();

  semantics = [
    {name:"Ambiguity Blocking without Team Defeat", value: "BDLwithoutTD"},
    {name:"Ambiguity Blocking with Team Defeat", value: "BDLwithTD"},
    {name:"Ambiguity Propagating without Team Defeat", value: "PDLwithoutTD"},
    {name:"Ambiguity Propagating with Team Defeat", value: "PDLwithTD"}
  ];

  constructor(private sgService:SgService, private rxStompService: RxStompService,
    private dialog: MatDialog, public overlayContainer: OverlayContainer, private cd:ChangeDetectorRef) {
    this.componentCssClass="light-theme";
  }

  ngOnInit() {
    this.project.KBs = [
      {
        source: 'Common',
        selected: true,
        locked: false,
        type: 'common',
        dlgp: "[r1] bird(X), notFly(X) <- penguin(X).\n [r2] fly(X) <= bird(X).\n\n penguin(kowalski).\n\n ! :- fly(X), notFly(X)."
      }
    ];
    this.project.query = "fly(kowalski). notFly(kowalski).";
  }

  ngOnDestroy() {
    if(this.collaborationSubscriptions) {
      this.collaborationSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  connect() {
    // ask for his name;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AgentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data && data.name) {
        this.agent = data.name
        this.project.KBs = [];
        this.connected = true;

        let kb = new KnowledgeBase();
        kb.source = this.agent;
        kb.agent_id = this.agent;
        let broadcastWatch = this.rxStompService.watch('/project/1').subscribe((payload) => {
          console.log("got message from subsription: ");
          console.log(payload);
          this.updateKnowledgeBase(JSON.parse(payload.body));
        });
        this.collaborationSubscriptions.push(broadcastWatch);

        let meWatch = this.rxStompService.watch('/agent/reply/1').subscribe((payload) => {
          console.log("got message TO ME: ");
          console.log(payload);
          this.project.KBs = JSON.parse(payload.body);
        });
        this.collaborationSubscriptions.push(meWatch);

        this.rxStompService.publish({destination: '/app/sg.addUser', body: JSON.stringify(kb)});
      }
    });
  }

  updateKnowledgeBase(kbInput:KnowledgeBase) {
    let k = this.project.KBs.find((kb) => kb.source === kbInput.source);
    if(k) {
      k.dlgp = kbInput.dlgp;
    } else {
      this.project.KBs.push(kbInput);
    }
  }

  onSave($event:KnowledgeBase) {
    if(this.connected) {
      this.rxStompService.publish({destination: '/app/sg.sendKB', body: JSON.stringify($event)});
    }
  }





  build():void {
    let kb:string = "";
    this.project.KBs.forEach(k => {
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
    this.project.KBs.forEach(k => {
      if(k.selected) {
        kb += k.dlgp;
      }
    });
    this.sgService.query(kb, this.project.query, this.project.semantic).subscribe(res => {
      this.sgService.onGetData.emit(res.json());
    }, error => {
      console.log(error);
    })
  }

  clearQuery():void {
    this.project.query = "";
  }

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      let json = JSON.parse(reader.result);
      this.project.KBs = json.KBs;
      this.project.query = json.query;
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
          this.project.KBs.push(addKB);
        }
      }
    });
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

}
