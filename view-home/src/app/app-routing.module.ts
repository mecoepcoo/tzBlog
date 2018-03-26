import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '/home',
    loadChildren: 'app/layout/layout.module#LayoutModule',
  },
  {
    path: '**', // fallback router must in the last
    redirectTo: '/home',
  }
];
