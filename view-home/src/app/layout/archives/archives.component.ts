import { Component, OnInit } from '@angular/core';
import { PostService } from '../../share/post.service';
import { parseTime } from '../../share/timeToDate.fn';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: [
    './archives.component.css'
  ],
  providers: [
    PostService
  ]
})
export class ArchivesComponent implements OnInit {

  postList: any = [
    {
      item: {
        year: 1970,
        posts: [
          {
            id: '',
            title: '',
            date: ''
          }
        ]
      }
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 10
  };

  constructor(
    private _postService: PostService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.setTitle('Tianzhen呀-归档');
    this.getTagList(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

  getTagList(currentPage, pageSize) {
    return this._postService.getPosts(currentPage, pageSize)
      .subscribe(datas => {
        this.pageConfig.totalNum = datas.total;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        this.postList = [];
        const tempArr = [];
        datas.data.forEach((post, index) => {
          const year = (new Date(post.date)).getFullYear();

          if (tempArr.indexOf(year) === -1) {
            tempArr.push(year);
          }
        });
        for (let i = 0; i < tempArr.length; i++) {
          this.postList.push({
            item: {
              year: tempArr[i],
              posts: []
            }
          });
        }
        const data = datas.data;
        for (let i = 0, len = data.length; i < len; i++) {
          for (let j = 0, len2 = this.postList.length; j < len2; j++) {
            const year = (new Date(data[i].date)).getFullYear();
            if (year === this.postList[j].item.year) {
              this.postList[j].item.posts.push({
                id: data[i]._id,
                title: data[i].title,
                date: parseTime(data[i].date, 2)
              });
            }
          }
        }
      });
  }

  getPageData(currentPage) {
    this.getTagList(currentPage, this.pageConfig.pageSize);
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
