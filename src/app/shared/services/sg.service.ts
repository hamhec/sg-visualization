import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from '../../../environments/environment';


import {Statement, StatementGraph, SGEdge} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SgService {
  apiRoot:string = `${environment.apiRoot}/sg`;

  onGetData:EventEmitter<any> = new EventEmitter();

  constructor(private http:HttpClient) { }

  build(kb:string):Observable<any> {
    let url = `${this.apiRoot}/build`;
    let data = {
      dlgp: kb
    };
    return this.http.post(url,data);
  }

  query(kb:string, query:string, chosenSemantics:string) {
    let url = `${this.apiRoot}/query`;
    let data = {
      dlgp: kb,
      query: query,
      semantics:chosenSemantics
    }
    return this.http.post(url,data);
  }
}
