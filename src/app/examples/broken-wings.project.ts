import {Project} from '../shared/models';

export class LegalProject {
    get():Project {
      return {
        name:"Broken wings",
        id:"",
        isPublic: true,
        creator_id: "",
        semantic: "BDLwithoutTD",
      	query:"innocent(raouf). guilty(raouf).",
      	KBs: [
      	    {
      	      source: "Common",
      	      selected: true,
      	      locked: false,
      	      type: "common",
      	      dlgp: "innocent(raouf) <= .\ntestimony(pierre, incriminating, raouf) <= .\ntestimony(martin, absolving, raouf) <= .\n\nresponsible(X) <- testimony(Y,incriminating,X).\nnotResponsible(X) <- testimony(Y, absolving, X).\nguilty(X) <- responsible(X).\n\n! :- innocent(X), guilty(X).\n! :- responsible(X), notResponsible(X)."
      	    }
      	],
        description: "This example showcases the use of defeater rules, which is a type of rules that prevent a conclusion from being drawn without necessarily implying it's contrary."
      }
    }
}
