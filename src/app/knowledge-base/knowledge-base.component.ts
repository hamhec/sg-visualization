import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

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

  @Output() build = new EventEmitter<KnowledgeBase>();

  @ViewChild('fileImportInput') fileImportInput:any;

  dlgp:string = "";

  constructor() { }

  ngOnInit() {
    if(!this.kb) {
      this.kb = new KnowledgeBase();
      this.setKnowledgeBaseDLGP("");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { kb } = changes;
    if (kb) {
      this.dlgp = this.kb.dlgp;
    }
  }

  setKnowledgeBaseDLGP(dlgp:string) {
    this.kb.dlgp = dlgp;
    this.kbChange.emit(this.kb);
  }

  buildKB():void {
    this.build.emit(this.kb);
  }

  undo() {
    this.dlgp = this.kb.dlgp;
  }

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      let dlgp = reader.result;
      this.setKnowledgeBaseDLGP(dlgp);
    }
  }
}
