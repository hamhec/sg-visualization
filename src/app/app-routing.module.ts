import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SgDisplayComponent} from './sg-display/sg-display.component';

import {HomeComponent} from './home/home.component';

import {DashboardComponent} from './dashboard/dashboard.component';

import {AuthenticationGuard, AnonymousGuard} from './shared';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'project/:id',
    component: SgDisplayComponent
  },
  {
    path: 'example/:id',
    component: SgDisplayComponent
  },
  {
    path: 'login',
    component: HomeComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'signup',
    component: HomeComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'project/:id',
    component: SgDisplayComponent,
    canActivate: [AuthenticationGuard]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
