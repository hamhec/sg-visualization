import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { GraphComponent } from './graph/graph.component';
import { MouseWheelDirective } from './graph/mouse-wheel.directive';

import { LayoutService } from './layout';

@NgModule({
  imports: [
    CommonModule,
    ChartCommonModule
  ],
  exports: [GraphComponent, MouseWheelDirective],
  declarations: [GraphComponent, MouseWheelDirective],
  providers: [LayoutService],
})
export class SgGraphModule { }
