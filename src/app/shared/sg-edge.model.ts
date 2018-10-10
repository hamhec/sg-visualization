import {Statement} from './statement.model';

export class SGEdge {


    // Must - defining enforced implementation properties
    source: Statement;
    target: Statement;

    constructor(source:Statement, target:Statement) {
        this.source = source;
        this.target = target;
    }
}
