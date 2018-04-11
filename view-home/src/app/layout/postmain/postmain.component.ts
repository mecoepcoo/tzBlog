import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { PostService } from '../../share/post.service';
import { Config } from '../../share/config';
import { parseTime } from '../../share/timeToDate.fn';

@Component({
  selector: 'app-postmain',
  templateUrl: './postmain.component.html',
  styleUrls: [
    './postmain.component.css'
  ],
  providers: [
    PostService
  ]
})
export class PostmainComponent implements OnInit {
  constructor(
    private _postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  posts: any = [
    {
      id: '',
      title: '',
      author: '',
      category: {
        _id: '',
        category: ''
      },
      tags: [],
      date: {
        year: '',
        month: '',
        day: ''
      },
      reading: '',
      content: '',
      summary: ''
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 5
  };

  ngOnInit() {
    this.setTitle('Tianzhen呀');
    this.activatedRoute.params
      .subscribe((param) => {
        param.id ? this.pageConfig.currentPage = +param.id : this.pageConfig.currentPage = 1;
        this.getPostList(this.pageConfig.currentPage, this.pageConfig.pageSize);
      });
  }

  getPostList(currentPage, pageSize) {
    return this._postService.getPosts(currentPage, pageSize)
      .subscribe(datas => {
        this.posts = [];
        this.pageConfig.totalNum = datas.total;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        datas.data.forEach( (data, index) => {
          const postsEle = {
            id: data._id,
            title: data.title,
            author: data.author,
            category: data._category,
            content: data.content,
            summary: data.summary,
            reading: data.reading,
            order: data.order,
            tags: data._tags,
            date: parseTime(data.date, 3)
          };
          this.posts.push(postsEle);
        });
      }, error => {
        console.error('文章载入失败');
      });
  }

  getPageData(currentPage) {
    this.router.navigate(['/home', currentPage]);
    this.getPostList(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
