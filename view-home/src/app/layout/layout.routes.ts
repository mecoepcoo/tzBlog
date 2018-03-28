import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PostmainComponent } from './postmain/postmain.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { ArchivesComponent } from './archives/archives.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PostmainComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'tags',
        component: TagsComponent
      },
      {
        path: 'archives',
        component: ArchivesComponent
      }
    ]
  },
];
