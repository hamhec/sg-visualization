import {Project} from '../shared/models';

export class RestaurantProject {
    get():Project {
      return {
        name:"Restaurant preferences",
        id:"",
        isPublic: true,
        creator_id: "",
        semantic: "BDLwithoutTD",
      	query:"entrecote > indian. indian > entrecote.",
      	KBs: [
      	    {
      	      source: "Common",
      	      selected: true,
      	      locked: false,
      	      type: "common",
      	      dlgp: "terrace(entrecote) <- .\n noTerrace(indian) <- .\n ! :- cheap(X), expensive(X).\n ! :- terrace(X), noTerrace(X).\n ! :- weather(X), notWeather(X).\n ! :- vegetariant(X), notVegetarian(X)."
      	    },
      	    {
      	      source: "Pierre",
      	      selected: true,
      	      locked: false,
      	      type: "",
      	      dlgp: "weather(sunny) <= .\n X > Y <- weather(sunny), terrace(X), noTerrace(Y).\n cheap(indian), vegetarian(indian) <= .\n expensive(entrecote), notVegetarian(entrecote) <= .\n X > Y <- vegetarian(X), notVegetarian(Y)."
      	},
      	  {
      	      source: "Raouf",
      	      selected: true,
      	      locked: false,
      	      type: "",
      	      dlgp: "notWeather(sunny) <= .\n X > Y <- cheap(X), expensive(Y).\n cheap(indian), expensive(entrecote) <= ."
      	  }
      	]
      }
    }
}
