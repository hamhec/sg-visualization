import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as shape from 'd3-shape';

import {SgService, StatementGraph} from '../shared';

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

  sg:StatementGraph;

  constructor(private sgService:SgService) { }

  ngOnInit() {
    this.showGraph();
  }

  showGraph() {
    this.sg = this.sgService.getStatementGraphJson();

  }
}
