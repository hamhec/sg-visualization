import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SgNgxComponent} from './sg-ngx/sg-ngx.component';
const routes: Routes = [
  {
    path: '',
    component: SgNgxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
