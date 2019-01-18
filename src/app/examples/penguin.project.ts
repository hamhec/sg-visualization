import {Project} from '../shared/models';

export class PenguinProject {
    get():Project {
      return {
        name:"Penguin",
        id:"",
        isPublic: true,
        creator_id: "",
        semantic: "BDLwithoutTD",
      	query:"fly(kowalski). notFly(kowalski).",
      	KBs: [
      	    {
      	      source: "Common",
      	      selected: true,
      	      locked: false,
      	      type: "common",
      	      dlgp: "[r1] bird(X), notFly(X) <- penguin(X).\n [r2] fly(X) <= bird(X).\n\n penguin(kowalski).\n\n ! :- fly(X), notFly(X)."
      	    }
      	]
      }
    }
}
