import {Project} from '../shared/models';

export class BuyPhoneProject {
    get():Project {
      return {
        name:"Buy phone",
        id:"buy-phone",
        isPublic: true,
        creator_id: "",
        semantic: "BDLwithoutTD",
      	query:"buy(pocophone). notBuy(pocophone).",
        kbs: [
      	    {
      	      source: "Common",
      	      selected: true,
      	      locked: false,
      	      type: "common",
      	      dlgp: "price(pocophone,cheap), delivery(pocophone,slow), reviews(pocophone,good), eco(pocophone,destructive) <- .\n\n[r1] buy(X) <= price(X,cheap).\n[r2] buy(X) <= reviews(X,good).\n[r3] notBuy(X) <= eco(X,destructive).\n[r4] notBuy(X) <= delivery(X,slow).\n\nr1 >> r3.\nr2 >> r4.\n\n! :- buy(X), notBuy(X)."
      	    }
      	]
      }
    }
}
