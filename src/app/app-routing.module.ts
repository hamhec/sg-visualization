import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SgGraphComponent} from './sg-graph/sg-graph.component';
import {SgNgxComponent} from './sg-ngx/sg-ngx.component';
const routes: Routes = [
  {
    path: '',
    component: SgNgxComponent
  },
  {
    path: 'sg',
    component: SgGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
