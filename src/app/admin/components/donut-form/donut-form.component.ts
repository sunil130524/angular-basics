import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-form',
  template: `
    <form class="donut-form" #donutForm="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input type="text" class="input" required minlength="3" name="name" [ngModel]="donut.name" [ngModelOptions]="{updateOn: 'blur'}" #nameInput="ngModel" />
        <ng-container *ngIf="nameInput.invalid && nameInput.touched">
          <div class="donut-form-error" *ngIf="nameInput.errors?.minlength">Minimum length of a name is 3!</div>
          <div class="donut-form-error" *ngIf="nameInput.errors?.required">Name is required.</div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>
        <select class="input input--select" required name="icon" [ngModel]="donut.icon" #iconSelect="ngModel">
          <option *ngFor="let icon of icons" [ngValue]="icon">{{ icon }}</option>
        </select>
        <ng-container *ngIf="iconSelect.invalid && iconSelect.touched">
          <div class="donut-form-error" *ngIf="iconSelect.errors?.required">Icon is required.</div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input type="number" class="input" required name="price" [ngModel]="donut.price" #priceInput="ngModel"/>
        <ng-container *ngIf="priceInput.invalid && priceInput.touched">
          <div class="donut-form-error" *ngIf="priceInput.errors?.required">Price is required.</div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input type="radio" value="new" name="promo" [ngModel]="donut.promo" />
          <span>New</span>
        </label>
        <label>
          <input type="radio" value="limited" name="promo" [ngModel]="donut.promo" />
          <span>Limited</span>
        </label>
        <label>
          <input type="radio" [value]="undefined" name="promo" [ngModel]="donut.promo" />
          <span>None</span>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea class="input input--textarea" required name="description" [ngModel]="donut.description" #descriptionInput="ngModel"></textarea>
        <ng-container *ngIf="descriptionInput.invalid && descriptionInput.touched">
          <div class="donut-form-error" *ngIf="descriptionInput.errors?.required">Description is required.</div>
        </ng-container>
      </label>

      <button type="button" class="btn btn--green" (click)="handleCreate(donutForm)">Create</button>
      <button type="button" class="btn btn--green" (click)="handleUpdate(donutForm)">Update</button>
      <button type="button" class="btn btn--green" (click)="handleDelete()">Delete</button>
      <button type="button" class="btn btn--grey" (click)="donutForm.resetForm()">Reset Form</button>

      <div class="donut-form-spinner" *ngIf="donutForm.valid && donutForm.submitted">
        Spinner...
      </div>

      <pre>{{donutForm.value | json}}</pre>
    </form>
    <ng-template #loading>
      Loading...
    </ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-spinner {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `
  ]
})
export class DonutFormComponent {
  @Input() donut! : Donut;

  @Output() createForm = new EventEmitter<Donut>();
  @Output() updateForm = new EventEmitter<Donut>();
  @Output() deleteForm = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleCreate(form: NgForm) {
    if(form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.createForm.emit(form.value);
  }

  handleUpdate(form: NgForm) {
    if(form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.updateForm.emit({
      id: this.donut.id,
      ...form.value
    });
  }

  handleDelete() {
    if(confirm(`Do you really want to delete ${this.donut.name}`)) {
      this.deleteForm.emit(this.donut);
    }
  }

}
