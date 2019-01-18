import { BrokenWingsProject, BuyPhoneProject, LegalProject, PenguinProject, RestaurantProject } from './';
import { Project } from '../shared/models';

export class Examples {
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
