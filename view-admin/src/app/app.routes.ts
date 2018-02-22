import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: 'app/layout/layout.module#LayoutModule',
    data: {
      breadcrumb: '主页',
    },
  },
  {
    path: '**', // fallback router must in the last
    component: LoginComponent
  }
];
