import { Component, Input } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-card',
  template: `
    <a class="donut-card" [routerLink]="donut.id">
      <img
        class="donut-card-icon logo"
        src="/assets/img/{{ donut.icon }}.svg"
        [alt]="donut.name"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}
          <ng-container [ngSwitch]="donut.promo">
            <span *ngSwitchCase="'new'" class="donut-card-promo">NEW</span>
            <span *ngSwitchCase="'limited'" class="donut-card-promo">LIMITED</span>
            <span *ngSwitchDefault class="donut-card-promo">ASUSUAL</span>
          </ng-container>
        </p>
        <p>{{ (donut.price/100) | currency: 'USD' }}</p>
      </div>
    </a>
  `,
  styles: [
    `
      .donut-card {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        transition: transform 0.2s ease-in-out;
        &:hover {
          transform: translateY(-3px);
        }
        &-name {
          font-size: 16px;
        }
        &-promo {
          border: 1px solid #c14583;
          border-radius: 4px;
          padding: 0 4px;
          margin-left: 5px;
          font-size: 12px;
          color: #c14583;
        }
        &-price {
          font-size: 14px;
          color: #c14583;
        }
        &-icon {
          width: 50px;
          margin-right: 10px;
        }
      }
    `,
  ],
})
export class DonutCardComponent {
  @Input() donut!: Donut;
}
