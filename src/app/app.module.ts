import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular material
import { MatSidenavModule, MatToolbarModule, MatButtonModule,
MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {SgService} from './shared';

import { SgNgxComponent } from './sg-ngx/sg-ngx.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    SgNgxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxGraphModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule
  ],
  providers: [SgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
