import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root'
})
export class DonutService {
  private donuts: Donut[] = [
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

  constructor() { }

  read() {
    return this.donuts;
  }

  readById(id: string) {
    const donut = this.donuts.find((donut) => donut.id === id);
    if(donut) {
      return donut;
    }
    return {
      name: '',
      icon: '',
      price: 0,
      description: ''
    }
  }

  create(payload: Donut) {
    this.donuts = [...this.donuts, payload];
  }

  update(payload: Donut) {
    this.donuts = this.donuts.map((donut) => {
      if(donut.id === payload.id) {
        return payload;
      }
      return donut;
    }); 
    console.log(this.donuts);
  }

  delete(payload: Donut) {
    this.donuts = this.donuts.filter((donut: Donut) => {
      return donut.id !== payload.id
    })
    console.log(this.donuts);
  }

}
