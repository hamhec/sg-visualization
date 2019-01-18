export class Statement {

  public id:string | number;
  public title:string;
  public type:string;
  public label:string;
  
  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
