import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SgDisplayComponent} from './sg-display/sg-display.component';

const routes: Routes = [
  {
    path: '',
    component: SgDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
