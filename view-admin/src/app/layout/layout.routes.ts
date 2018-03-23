import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { SysinfoComponent } from './sysinfo/sysinfo.component';
import { PostComponent } from './post/post.component';
import { BlogrollComponent } from './blogroll/blogroll.component';
import { EditpostComponent } from './editpost/editpost.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'adminuser',
        component: AdminListComponent,
        data: {
          breadcrumb: '管理员'
        }
      },
      {
        path: 'admingroup',
        component: AdminGroupComponent,
        data: {
          breadcrumb: '管理组'
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          breadcrumb: '分类管理'
        }
      },
      {
        path: 'tag',
        component: TagComponent,
        data: {
          breadcrumb: '标签管理'
        }
      },
      {
        path: 'sysinfo',
        component: SysinfoComponent,
        data: {
          breadcrumb: '系统信息'
        }
      },
      {
        path: 'post',
        component: PostComponent,
        data: {
          breadcrumb: '文章管理'
        }
      },
      {
        path: 'editpost',
        component: EditpostComponent,
        data: {
          breadcrumb: '新增文章'
        }
      },
      {
        path: 'editpost/:id',
        component: EditpostComponent,
        data: {
          breadcrumb: '修改文章'
        }
      },
      {
        path: 'blogroll',
        component: BlogrollComponent,
        data: {
          breadcrumb: '友情链接'
        }
      }
    ]
  }
];
