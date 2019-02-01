import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';

import {Agent} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiRoot:string = `${environment.apiRoot}/collaboration`;

  constructor(private http:HttpClient) { }

  search(username:string):Observable<String[]> {
    return username ? this.http.get<String[]>(`${this.apiRoot}/user/${username}`) : of([]);
  }
}
