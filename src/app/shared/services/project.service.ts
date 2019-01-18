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

  constructor(private http:HttpClient) { }

  saveProject(data):Observable<Project> {
    let url = `${this.apiRoot}`;
    if(data.id) {
      url += `/update`;
    } else {
      url += '/add';
    }
    return this.http.post<Project>(url,data);
  }

  getProject(id:string):Observable<Project> {
    return this.http.get<Project>(`${this.apiRoot}/get/${id}`);
  }
}
