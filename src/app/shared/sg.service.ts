import { Injectable } from '@angular/core';

import {Statement} from './statement.model';
import {StatementGraph} from './statement-graph.model';
import {SGEdge} from './sg-edge.model';

@Injectable({
  providedIn: 'root'
})
export class SgService {

  constructor() { }

  getStatementGraph():StatementGraph {
    let statements:Statement[] = [
      new Statement({id: 0, title: "T -> penguin(kowalski)"}),
      new Statement({id: 1, title: "penguin(kowalski) -> bird(kowalski)"}),
      new Statement({id: 2, title: "bird(kowalski) => fly(kowalski)"})
    ];

    let edges:SGEdge[] = [
      new SGEdge(statements[0],statements[1]),
      new SGEdge(statements[1],statements[2])
    ];

    return new StatementGraph(statements, edges);
  }


}
