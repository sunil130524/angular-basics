import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';

@Component({
  standalone: true,
  imports: [DonutFormComponent],
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form [donut]="donut" [isEdit]="isEdit" (createForm)="onCreateDonutForm($event)" (updateForm)="onUpdateDonutForm($event)" (deleteForm)="onDeleteDonut($event)"></app-donut-form>
    </div>
  `,
  styles: [
  ]
})
export class DonutSingleComponent implements OnInit{
  donut!: Donut
  isEdit!: boolean

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private donutService: DonutService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.donutService.readById(id).subscribe({
      next: (donut: Donut) => this.donut = donut,
      error: (err) => console.warn(err)
    });

    this.isEdit = this.activatedRoute.snapshot.data['isEdit'];
  }

  onCreateDonutForm(donutForm: Donut) {
    this.donutService.create(donutForm).subscribe({
      next: (donut: Donut) => this.router.navigate(['admin', 'donuts', donut.id]),
      error: (err) => console.warn(err)
    });
  }

  onUpdateDonutForm(donutForm: Donut) {
    this.donutService.update(donutForm).subscribe({
     next: (donut: Donut) => this.router.navigate(['admin', 'donuts']),
     error: (err) => console.warn(err)
    }
    );
  }

  onDeleteDonut(donut: Donut) {
    this.donutService.delete(donut).subscribe({
      next: (donut: Donut) => this.router.navigate(['admin', 'donuts']),
      error: (err) => console.warn(err)
    });
  }

}
