import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SgGraphComponent } from './sg-graph/sg-graph.component';

import {GraphService} from './sg-graph/graph.service';
import {SgService} from './shared';
import { NodeVisualComponent } from './sg-graph/visuals/node-visual/node-visual.component';
import { LinkVisualComponent } from './sg-graph/visuals/link-visual/link-visual.component';


import { SgNgxComponent } from './sg-ngx/sg-ngx.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    SgGraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    SgNgxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxGraphModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [SgService, GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
