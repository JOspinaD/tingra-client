import { Routes } from '@angular/router';
import{ LayoutComponent}  from './shared/components/layout/layout.component'
import { HomeComponent } from './features/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  }
];
