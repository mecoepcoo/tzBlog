import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { marked } from 'marked';

import 'rxjs/add/operator/switchMap';
import { PostService } from '../../share/post.service';
import { parseTime } from '../../share/timeToDate.fn';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [
    './post.component.css'
  ],
  providers: [
    PostService
  ]
})
export class PostComponent implements OnInit {

  constructor(
    private _PostService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  id = '';
  post = {
    id: '',
    title: '',
    author: '',
    category: {
      id: '',
      name: ''
    },
    tags: [],
    date: '',
    content: '',
    reading: 0
  };

  neighbors = {
    prevPost: {
      id: '',
      title: ''
    },
    nextPost: {
      id: '',
      title: ''
    }
  };


  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params
      .subscribe((param) => {
        this._PostService.getPost(param.id)
          .subscribe();

        this._PostService.getPost(param.id)
          .subscribe((data) => {
            const post = data.data.post;
            this.post = {
              id: post._id,
              title: post.title,
              author: post.author,
              category: {
                id: post._category._id,
                name: post._category.name
              },
              tags: post._tags,
              date: parseTime(post.date),
              reading: post.reading,
              content: post.content
            };
            const prev = data.data.prevPost;
            const next = data.data.nextPost;
            this.neighbors = {
              prevPost: {
                id: prev._id,
                title: prev.title
              },
              nextPost: {
                id: next._id,
                title: next.title
              }
            };
            const content = editormd.markdownToHTML('markdown-view', {
              markdown: this.post.content,
              htmlDecode: 'style,script,iframe,link',  // you can filter tags decode
              toc: true,
              markdownSourceCode: false,
              emoji: true,
              taskList: true,
              tex: true,  // 默认不解析
              flowChart: true,  // 默认不解析
            });
          });
      });

  }

}
