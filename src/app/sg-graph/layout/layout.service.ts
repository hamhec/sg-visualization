import { Injectable } from '@angular/core';

import {Layout} from '../model';
import {DagreLayout} from './dagre.layout';


const layouts = {
  dagre: DagreLayout
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  getLayout(name:string): Layout {
    if(layouts[name]) {
      return new layouts[name]();
    } else {
      throw new Error(`Unknown layout type '${name}'`);
    }
  }
}
