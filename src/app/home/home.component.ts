
import { Component, OnInit } from '@angular/core';

import {Examples} from '../examples/examples';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  examples = [];

  constructor() {
    let ex = new Examples();
    this.examples.push(ex.getPenguinExample());
    this.examples.push(ex.getBrokenWingsExample());
    this.examples.push(ex.getLegalExample());
    this.examples.push(ex.getBuyPhoneExample());
    this.examples.push(ex.getRestaurantExample());
  }

  ngOnInit() {
  }

}
