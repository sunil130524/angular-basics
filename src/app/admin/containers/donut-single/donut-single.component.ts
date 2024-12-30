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
    const id = '8amkZ9'
    this.donutService.readById(id).subscribe({
      next: (donut: Donut) => this.donut = donut,
      error: (err) => console.warn(err)
    });
  }

  onCreateDonutForm(donutForm: Donut) {
    this.donutService.create(donutForm).subscribe({
      next: () => console.log("Donut created successfully!"),
      error: (err) => console.warn(err)
    });
  }

  onUpdateDonutForm(donutForm: Donut) {
    this.donutService.update(donutForm).subscribe({
     next: () => console.log("Donut updated successfully!"),
     error: (err) => console.warn(err)
    }
    );
  }

  onDeleteDonut(donut: Donut) {
    this.donutService.delete(donut).subscribe({
      next: () => console.log("Donut deleted successfully!"),
      error: (err) => console.warn(err)
    });
  }

}
