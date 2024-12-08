import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-list',
  template: `
  <div>
    <ng-container *ngIf="donuts.length; else nothing">
      <app-donut-card 
        *ngFor="let donut of donuts; trackBy: trackById;" 
        [donut]="donut">
      </app-donut-card>
    </ng-container>

    <ng-template #nothing>
      <p>No donuts here..</p>
    </ng-template>
  </div>
  `,
  styles: [
  ]
})
export class DonutListComponent implements OnInit{
  donuts!: Donut[];

  ngOnInit(): void {
    this.donuts = [
      {
        id: 'y8z0As',
        name: 'Just Chocolate',
        icon: 'just-chocolate',
        promo: 'new',
        price: 119,
        description: 'For the pure chocoholic.',
      },
      {
        id: '3u98Kl',
        name: 'Glazed Fudge',
        icon: 'glazed-fudge',
        promo: 'limited',
        price: 129,
        description: 'Sticky perfection.',
      },
      {
        id: 'ae098s',
        name: 'Caramel Swirl',
        icon: 'caramel-swirl',
        price: 129,
        description: 'Chocolate drizzled with caramel.',
      },
    ];
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }

}
