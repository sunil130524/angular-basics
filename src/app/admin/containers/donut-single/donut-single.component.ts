import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form [donut]=donut (createForm)="onCreateDonutForm($event)"></app-donut-form>
    </div>
  `,
  styles: [
  ]
})
export class DonutSingleComponent implements OnInit{
  donut!: Donut

  ngOnInit(): void {
    this.donut = {
      id: 'y8z0As',
      name: 'Just Chocolate',
      icon: 'just-chocolate',
      promo: 'new',
      price: 119,
      description: 'For the pure chocoholic.',
    }
  }

  onCreateDonutForm(donutForm: Donut) {
    console.log("onCreateDonutForm", donutForm);
  }

}
