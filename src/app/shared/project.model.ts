import { StatementGraph } from './statement-graph.model';
import { KnowledgeBase } from './knowledge-base.model';

export class Project {
  public id?:string;
  public isPublic?:boolean;
  public creator_id?:string;
  public KBs:KnowledgeBase[];
  public query:string;
  public semantic?:string;

  constructor() {
    this.id = "";
    this.isPublic =  true;
    this.creator_id = "";
    this.KBs = [];
    this.query = "";
    this.semantic = "BDLwithoutTD";
  }
}
