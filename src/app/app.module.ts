import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular material
import { MatSidenavModule, MatToolbarModule, MatButtonModule,
MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { SgGraphModule } from './sg-graph/sg-graph.module';


import { AppComponent } from './app.component';

import {SgService} from './shared';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SgDisplayComponent } from './sg-display/sg-display.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
@NgModule({
  declarations: [
    AppComponent,
    SgDisplayComponent,
    KnowledgeBaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    SgGraphModule,

    FormsModule,
    HttpModule,

    NgxChartsModule,

    MatSidenavModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule
  ],
  providers: [SgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
