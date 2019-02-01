import { BrokenWingsProject, BuyPhoneProject, LegalProject, PenguinProject, RestaurantProject } from './';
import { Project } from '../shared/models';

export class Examples {

  getProject(id:string):Project {
    if(id == "broken-wings") {
      return this.getBrokenWingsExample();
    } else if(id == "buy-phone") {
      return this.getBuyPhoneExample();
    } else if(id == "legal-reasoning") {
      return this.getLegalExample();
    } else if(id == "restaurant") {
      return this.getRestaurantExample();
    } else {
      return this.getPenguinExample();
    }
  }

  getPenguinExample():Project {
    return (new PenguinProject).get();
  }

  getBrokenWingsExample():Project {
    return (new BrokenWingsProject).get();
  }

  getBuyPhoneExample():Project {
    return (new BuyPhoneProject).get();
  }

  getLegalExample():Project {
    return (new LegalProject).get();
  }

  getRestaurantExample():Project {
    return (new RestaurantProject).get();
  }
}
