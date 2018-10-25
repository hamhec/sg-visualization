import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';



import {Statement} from './statement.model';
import {StatementGraph} from './statement-graph.model';
import {SGEdge} from './sg-edge.model';

@Injectable({
  providedIn: 'root'
})
export class SgService {
  apiRoot:string = "http://localhost:8080/api/sg";

  onGetData:EventEmitter<any> = new EventEmitter();

  constructor(private http:Http) { }

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
