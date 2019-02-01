import { Component, OnInit } from '@angular/core';

import {Project, ProjectService} from '../shared';

import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ownProjects:Project[];
  collaborationProjects:Project[];

  constructor(private projectService:ProjectService,
              private router:Router) { }

  ngOnInit() {
    this.projectService.getOwnProjects().subscribe(data => {
      this.ownProjects = data;
    }, error => {
      console.log(error);
    });

    this.projectService.getCollaborationProjects().subscribe(data => {
      this.collaborationProjects = data;
    }, error => {
      console.log(error);
    });
  }

  redirectTo(path:string) {
    this.router.navigate([path]);
  }

}
