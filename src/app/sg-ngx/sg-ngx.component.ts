import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as shape from 'd3-shape';

import {SgService, StatementGraph} from '../shared';

@Component({
  selector: 'sg-ngx',
  templateUrl: './sg-ngx.component.html',
  styleUrls: ['./sg-ngx.component.scss']
})
export class SgNgxComponent implements OnInit, AfterViewInit  {


  theme = 'light';//'dark';
  view = undefined; //[1000,1000];
  layout = 'dagre';
  curve = shape.curveLinear;

  layoutSettings = {orientation:'BT'};

  sg:StatementGraph;

  constructor(private sgService:SgService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.showGraph();
  }

  showGraph() {
    this.sgService.onGetData.subscribe(res => {
      // if empty statement graph then simply assigning
      if(!this.sg) {
        this.sg = res;
        return
      }

      let statements:Statement[] = [];
      let edges:SGEdge[] = [];

      // remove and update statements
      this.sg.statements.forEach(s => {
        const updated = res.statements.find(statement => statement.id === s.id);
        if(updated) { // element already exists
            statements.push(Object.assign(s, updated));
        }
      });
      // add new statements
      res.statements.forEach(newS => {
        const existingS = this.sg.statements.find(statement => statement.id === newS.id);
        if(!existingS) { // edge does not exist
            statements.push(newS);
      });


      // remove and update edges
      this.sg.edges.forEach(e => {
        const updated = res.edges.find(edge => edge.id === e.id);
        if(updated) { // element already exists
            edges.push(Object.assign(e, updated));
        }
      });
      // add new edges
      res.edges.forEach(newE => {
        const existingE = this.sg.edges.find(edge => edge.id === newE.id);
        if(!existingE) { // edge does not exist
            edges.push(newE);
      });
      this.sg.edges = edges;
      this.sg.statements = statements;
    }, error => {
      console.log(error)
    });
  }
}
