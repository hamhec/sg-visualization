export class KnowledgeBase {
  public dlgp:string;
  public source:string;
  public agent_id?:string;
  public selected:boolean;
  public type: 'common' | string;
  public locked:boolean;


  constructor() {
    this.dlgp = "";
    this.source = "";
    this.agent_id = "";
    this.selected = true;
    this.type = "";
    this.locked = false;
  }
}
