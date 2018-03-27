import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取文章列表（筛选） */
  getPosts(page: number = 0, pagesize: number = 0, categoryid: string = '', tagid: string = ''): Observable<any> {
    const url = `${Config.apiRoot}posts`;
    const options = {
      params: {
        page: page,
        pagesize: pagesize,
        categoryid: categoryid,
        tagid: tagid
      }
    };
    return this.http.get(url);
  }
}
