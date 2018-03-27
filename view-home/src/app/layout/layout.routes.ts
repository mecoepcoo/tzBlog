import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PostmainComponent } from './postmain/postmain.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    component: LayoutComponent,
    children: [
      {
        path: 'index',
        component: PostmainComponent,
      }
    ]
  },
];
