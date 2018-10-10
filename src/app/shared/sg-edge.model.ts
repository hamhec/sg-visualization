export class SGEdge {

    source: string | number;
    target: string | number;
    type:string;
    label:string;

    constructor(values:Object = {}) {
      Object.assign(this, values);
    }
}
