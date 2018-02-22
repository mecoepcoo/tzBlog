import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { layoutRoutes } from './layout.routes';
import { ShareModule } from '../share/share.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { AdminListComponent } from './admin-list/admin-list.component';

import { BaseInterceptor } from '../share/base.intercept';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { SysinfoComponent } from './sysinfo/sysinfo.component';
import { PostComponent } from './post/post.component';
import { BlogrollComponent } from './blogroll/blogroll.component';

import { CategoryService } from '../share/category.service';
import { TagService } from '../share/tag.service';
import { PostService } from '../share/post.service';

@NgModule({
  imports: [
    NgZorroAntdModule,
    ShareModule,
    RouterModule.forChild(layoutRoutes)
  ],
  declarations: [
    LayoutComponent,
    BreadCrumbComponent,
    AdminListComponent,
    CategoryComponent,
    TagComponent,
    SysinfoComponent,
    PostComponent,
    BlogrollComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    CategoryService,
    TagService,
    PostService,
  ]
})
export class LayoutModule { }
