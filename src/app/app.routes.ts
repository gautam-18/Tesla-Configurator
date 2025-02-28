import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { carSelectedGuard } from './guards/car-selected.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'step1', pathMatch: 'full' },
  { path: 'step1', component: Step1Component },
  {
    path: 'step2',
    component: Step2Component,
    canActivate: [carSelectedGuard],
  },
  {
    path: 'step3',
    component: Step3Component,
    canActivate: [carSelectedGuard],
  },
];
