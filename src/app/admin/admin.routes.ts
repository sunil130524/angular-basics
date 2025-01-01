import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('./containers/donut-list/donut-list.component').then(
        (comp) => comp.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('./containers/donut-single/donut-single.component').then(
        (comp) => comp.DonutSingleComponent
      ),
    data: { isEdit: false },
  },
  {
    path: 'donuts/:id',
    loadComponent: () =>
      import('./containers/donut-single/donut-single.component').then(
        (comp) => comp.DonutSingleComponent
      ),
    data: { isEdit: true },
  },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];
