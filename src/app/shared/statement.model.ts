export class Statement {

  public title:string;
  public id;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
