import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form [donut]=donut (createForm)="onCreateDonutForm($event)" (updateForm)="onUpdateDonutForm($event)" (deleteForm)="onDeleteDonut($event)"></app-donut-form>
    </div>
  `,
  styles: [
  ]
})
export class DonutSingleComponent implements OnInit{
  donut!: Donut

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    const id = '3u98Kl'
    this.donut = this.donutService.readById(id);
  }

  onCreateDonutForm(donutForm: Donut) {
    this.donutService.create(donutForm);
  }

  onUpdateDonutForm(donutForm: Donut) {
    this.donutService.update(donutForm);
  }

  onDeleteDonut(donut: Donut) {
    this.donutService.delete(donut);
  }

}
