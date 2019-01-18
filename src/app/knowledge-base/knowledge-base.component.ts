import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {AgentDialogComponent} from '../dialog-boxes/agent-dialog/agent-dialog.component';


import { KnowledgeBase } from '../shared';


@Component({
  selector: 'sg-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit, OnChanges {

  @Input() kb:KnowledgeBase;
  @Output() kbChange = new EventEmitter<KnowledgeBase>();

  @Input() show:boolean = false;

  @ViewChild('fileImportInput') fileImportInput:any;

  @Output() remove = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<KnowledgeBase>();


  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    if(!this.kb) {
      this.kb = new KnowledgeBase();
    }
    if(this.kb.type === 'common') {
      this.show = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const { kb } = changes;
    // if (kb) {
    //   this.dlgp = this.kb.dlgp;
    // }
  }

  setSelected(selected:boolean) {
    this.kb.selected = selected;
    this.kbChange.emit(this.kb);
  }

  undo() {
    // this.dlgp = this.kb.dlgp; //TODO fix this
  }

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      this.kb.dlgp = reader.result.toString();
    }
  }

  openAgentDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: this.kb.source
    }

    const dialogRef = this.dialog.open(AgentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.kb.source = data.name;
        this.kbChange.emit(this.kb);
      }
    })
  }

  delete() {
    this.remove.emit(true);
  }
}
