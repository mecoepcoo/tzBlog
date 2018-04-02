import { Component, OnInit } from '@angular/core';

import { BlogrollService } from '../../share/blogroll.service';
import { OtherService } from '../../share/other.service';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: [
    './blog-sidebar.component.css'
  ],
  providers: [
    BlogrollService,
    OtherService,
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
    private _otherService: OtherService,
  ) { }

  ngOnInit() {
    this.getBlogroll();
    this.getOthers();
  }

  getBlogroll() {
    return this._blogrollService.getBlogroll()
      .subscribe(datas => {
        this.blogrolls = [];
        datas.data.forEach( (data, index) => {
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

  getOthers() {
    return this._otherService.getOthers()
      .subscribe(datas => {
        this.numbs = {
          postNum: datas.data.count.post,
          categoryNum: datas.data.count.category,
          tagNum: datas.data.count.tag
        };
      });
  }

}
