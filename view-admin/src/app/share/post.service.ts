import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from './config';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取文章列表 */
  getPosts(page, size): Observable<any> {
    const url = `${Config.apiRoot}posts`;
    const options = {
      params: {
        page: page,
        pagesize: size
      }
    };
    return this.http.get(url, options);
  }

  /* 删除单篇 */
  removePost(id: string): Observable<any> {
    const url = `${Config.apiRoot}posts/${id}`;
    return this.http.delete(url);
  }
}
