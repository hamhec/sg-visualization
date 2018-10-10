import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as shape from 'd3-shape';

@Component({
  selector: 'sg-ngx',
  templateUrl: './sg-ngx.component.html',
  styleUrls: ['./sg-ngx.component.scss']
})
export class SgNgxComponent implements OnInit {
  theme = 'dark';
  view = undefined; //[1000,1000];
  layout = null;
  curve = shape.curveLinear;

  orientation = 'BT';

  sg = {nodes:[], links: []};

  constructor() { }

  ngOnInit() {
    this.showGraph();
  }

  showGraph() {
    this.sg.nodes = [
     {
       id: 's1',
       title: 'T ⟶ penguin(kowalski)',
       type: 'fact',
       label: 'INstr'
     }, {
       id: 's2',
       title: 'penguin(kowalski) ⟶ bird(kowalski)',
       type: 'statement',
       label: 'INstr'
     }, {
       id: 's3',
       title: 'bird(kowalski) ⟹ fly(kowalski)',
       type: 'statement',
       label: 'INdef'
     }, {
       id: 's4',
       title: 'penguin(kowalski) ⟶ notFly(kowalski)',
       type: 'statement',
       label: 'INstr'
     }, {
       id: 's5',
       title: 'fly(kowalski)',
       type: 'claim',
       label: 'OUTstr'
     }, {
       id: 's6',
       title: 'notFly(kowalski)',
       type: 'claim',
       label: 'INstr'
     }, {
       id: 's7',
       title: 'T ⟶ bird(tweety)',
       type: 'fact',
       label: ''
     }
   ];

   this.sg.links = [
     {
       source: 's1',
       target: 's2',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's1',
       target: 's4',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's2',
       target: 's3',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's3',
       target: 's5',
       label: 'INdef',
       type: 'support'
     }, {
       source: 's4',
       target: 's5',
       label: 'INstr',
       type: 'attack'
     }, {
       source: 's4',
       target: 's6',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's3',
       target: 's6',
       label: 'INdef',
       type: 'attack'
     }
   ];

  }
}
