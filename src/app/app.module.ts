import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


// Angular material
import { MatSidenavModule, MatToolbarModule, MatButtonModule,
MatIconModule, MatCardModule, MatMenuModule, MatInputModule,
MatSelectModule, MatCheckboxModule, MatDialogModule, MatSlideToggleModule, MatExpansionModule, MatSnackBarModule,
MatTooltipModule, MatListModule } from '@angular/material';
import { OverlayModule} from '@angular/cdk/overlay';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { SgGraphModule } from './sg-graph/sg-graph.module';


import { AppComponent } from './app.component';

import {SgService, AgentService, AuthenticationService, TokenStorageService, httpInterceptorProviders, AuthenticationGuard, AnonymousGuard,
ProjectService} from './shared';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SgDisplayComponent } from './sg-display/sg-display.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import {AgentDialogComponent, LoginComponent, RegisterComponent, AddProjectDialogComponent} from './dialog-boxes';


// For collaboration
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SgDisplayComponent,
    KnowledgeBaseComponent,
    AgentDialogComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AddProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    SgGraphModule,

    FormsModule,
    HttpClientModule,

    NgxChartsModule,

    MatSidenavModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatDialogModule, MatSlideToggleModule,
    OverlayModule, MatExpansionModule, MatSnackBarModule,
    MatTooltipModule, MatListModule
  ],
  providers: [SgService, AgentService, ProjectService,
    AuthenticationService, TokenStorageService, httpInterceptorProviders, AuthenticationGuard, AnonymousGuard,
    {
       provide: InjectableRxStompConfig,
       useValue: myRxStompConfig
     },
     {
       provide: RxStompService
       // ,
       // useFactory: rxStompServiceFactory,
       // deps: [InjectableRxStompConfig]
     }
   ],
  bootstrap: [AppComponent],
  entryComponents: [AgentDialogComponent, LoginComponent, RegisterComponent]
})
export class AppModule { }
