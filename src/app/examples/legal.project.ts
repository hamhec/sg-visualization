import {Project} from '../shared/models';

export class BrokenWingsProject {
    get():Project {
      return {
        name:"Legal reasoning",
        id:"legal-reasoning",
        isPublic: true,
        creator_id: "",
        semantic: "BDLwithoutTD",
      	query:"fly(tweety). notFly(tweety).",
      	kbs: [
      	    {
      	      source: "Common",
      	      selected: true,
      	      locked: false,
      	      type: "common",
      	      dlgp: "brokenWings(tweety), bird(tweety) <- .\n\nfly(X) <= bird(X).\nnotFly(X) <~ brokenWings(X).\n\n! :- fly(X), notFly(X)."
      	    }
      	]
      }
    }
}
