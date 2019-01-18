import { StatementGraph } from './statement-graph.model';
import { KnowledgeBase } from './knowledge-base.model';

export class Project {
  public name:string;
  public id?:string;
  public isPublic?:boolean;
  public creator_id?:string;
  public KBs:KnowledgeBase[];
  public query:string;
  public semantic?:string;
  public description?:string;

  constructor() {
    this.name = "";
    this.id = "";
    this.isPublic =  true;
    this.creator_id = "";
    this.KBs = [];
    this.query = "";
    this.semantic = "BDLwithoutTD";
  }
}
