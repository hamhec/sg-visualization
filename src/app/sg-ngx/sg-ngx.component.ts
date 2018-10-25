import { Component, OnInit, AfterViewInit,
  ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import * as shape from 'd3-shape';

import {SgService, StatementGraph} from '../shared';

@Component({
  selector: 'sg-ngx',
  templateUrl: './sg-ngx.component.html',
  styleUrls: ['./sg-ngx.component.scss']
})
export class SgNgxComponent implements OnInit, AfterViewInit  {
  @ViewChild('ngraph') ngraph:any;


  theme = 'light';//'dark';
  view = undefined; //[1000,1000];
  layout = null;
  curve = shape.curveLinear;

  orientation = 'BT';

  sg:StatementGraph;

  constructor(private sgService:SgService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.showGraph();
  }

  showGraph() {
    this.sgService.onGetData.subscribe(res => {
      this.sg = null;
      this.cdr.detectChanges();
      this.sg = res;
    }, error => {
      console.log(error)
    });
  }
}
