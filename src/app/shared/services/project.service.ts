import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from '../../../environments/environment';

import {Project} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiRoot:string = `${environment.apiRoot}/project`;
  apiRootCollaboration:string = `${environment.apiRoot}/collaboration`;

  constructor(private http:HttpClient) { }

  saveProject(data):Observable<Project> {
    let url = `${this.apiRoot}`;
    if(data.id) {
      url += `/update`;
    } else {
      url += '/add';
      data.kbs = [ {
         source: "Common",
         selected: true,
         locked: false,
         type: "common",
         dlgp: ""
       }];
    }
    return this.http.post<Project>(url,data);
  }

  getProject(id:string):Observable<Project> {
    return this.http.get<Project>(`${this.apiRoot}/get/${id}`);
  }

  getOwnProjects():Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiRoot}/get/created`);
  }

  getCollaborationProjects():Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiRoot}/get/collaboration`);
  }

  inviteUser(username:string, project_id:string):Observable<any> {
    return this.http.get<any>(`${this.apiRootCollaboration}/invite/${username}/to/${project_id}`);
  }

  saveKB(projectId:string, kb):Observable<any> {
    return this.http.post<any>(`${this.apiRootCollaboration}/saveKB/${projectId}`, kb);
  }
}
