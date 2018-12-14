import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// Angular material
import { MatSidenavModule, MatToolbarModule, MatButtonModule,
MatIconModule, MatCardModule, MatMenuModule, MatInputModule,
MatSelectModule, MatCheckboxModule, MatDialogModule, MatSlideToggleModule, MatExpansionModule } from '@angular/material';
import { OverlayModule} from '@angular/cdk/overlay';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { SgGraphModule } from './sg-graph/sg-graph.module';


import { AppComponent } from './app.component';

import {SgService} from './shared';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SgDisplayComponent } from './sg-display/sg-display.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import {AgentDialogComponent} from './dialog-boxes/agent-dialog/agent-dialog.component';


// For collaboration
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';

@NgModule({
  declarations: [
    AppComponent,
    SgDisplayComponent,
    KnowledgeBaseComponent,
    AgentDialogComponent
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
    MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatDialogModule, MatSlideToggleModule,
    OverlayModule, MatExpansionModule
  ],
  providers: [SgService,
    {
       provide: InjectableRxStompConfig,
       useValue: myRxStompConfig
     },
     {
       provide: RxStompService,
       useFactory: rxStompServiceFactory,
       deps: [InjectableRxStompConfig]
     }
   ],
  bootstrap: [AppComponent],
  entryComponents: [AgentDialogComponent]
})
export class AppModule { }
