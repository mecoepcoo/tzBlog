import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { layoutRoutes } from './layout.routes';
import { ShareModule } from '../share/share.module';

import { LayoutComponent } from './layout.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';
import { BlogFooterComponent } from './blog-footer/blog-footer.component';
import { PostmainComponent } from './postmain/postmain.component';
import { PageComponent } from './page/page.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { ArchivesComponent } from './archives/archives.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptor } from '../share/base.intercept';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(layoutRoutes)
  ],
  declarations: [
    LayoutComponent,
    BlogHeaderComponent,
    BlogSidebarComponent,
    BlogFooterComponent,
    PostmainComponent,
    PageComponent,
    AboutComponent,
    CategoriesComponent,
    TagsComponent,
    ArchivesComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
  ]
})
export class LayoutModule { }
