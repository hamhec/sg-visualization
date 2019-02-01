import { Component, OnInit } from '@angular/core';

import {Examples} from '../examples/examples';

import { Router} from '@angular/router';

@Component({
  selector: 'app-examples-list',
  templateUrl: './examples-list.component.html',
  styleUrls: ['./examples-list.component.scss']
})
export class ExamplesListComponent implements OnInit {
  examples = [];

  constructor(private router:Router) {
    let ex = new Examples();
    this.examples.push(ex.getPenguinExample());
    this.examples.push(ex.getBrokenWingsExample());
    this.examples.push(ex.getLegalExample());
    this.examples.push(ex.getBuyPhoneExample());
    this.examples.push(ex.getRestaurantExample());
  }

  ngOnInit() {
  }

  redirectTo(path:string) {
    this.router.navigate([path]);
  }

}
