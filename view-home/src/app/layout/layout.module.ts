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
