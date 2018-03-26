import { Component, OnInit } from '@angular/core';

import { BlogrollService } from '../../share/blogroll.service';
// import { DataService } from '../share/data.service';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['../../public/css/sidebar.css'],
  providers: [
    BlogrollService
  ]
})
export class BlogSidebarComponent implements OnInit {
  blogrolls: any = [
    {
      id: '',
      name: '',
      url: '',
      order: ''
    }
  ];

  numbs = {
    postNum: 0,
    categoryNum: 0,
    tagNum: 0
  };


  constructor(
    private _blogrollService: BlogrollService,
    // private _dataService: DataService
  ) { }

  ngOnInit() {
    this.getBlogroll();
  }

  getBlogroll() {
    return this._blogrollService.getBlogroll()
      .subscribe(datas => {
        this.blogrolls = [];
        datas.forEach( (data, index) => {
          const blogrollsEle = {
            id: data._id,
            name: data.name,
            url: data.url,
            order: data.order
          };
          this.blogrolls.push(blogrollsEle);
        });
      }, error => {
        console.error('友链载入失败');
      });
  }

}
