import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from '../../share/config';

@Injectable()
export class BlogrollService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取友链列表 */
  getBlogroll(): Observable<any> {
    const url = `${Config.apiRoot}blogrolls`;
    return this.http.get(url);
  }

  /* 新增友链 */
  addBlogroll(name: string, link: string, order: number | string): Observable<any> {
    const url = `${Config.apiRoot}blogrolls`;
    return this.http.post(url, {
      name: name,
      url: link,
      order: order
    });
  }

  /* 修改友链 */
  editBlogroll(id: string, name: string, link: string, order: number | string): Observable<any> {
    const url = `${Config.apiRoot}blogrolls/${id}`;
    return this.http.put(url, {
      name: name,
      url: link,
      order: order
    });
  }

  /* 删除一条友链 */
  removeBlogroll(id: string): Observable<any> {
    const url = `${Config.apiRoot}blogrolls/${id}`;
    return this.http.delete(url);
  }

  removeBlogrolls(ids: string[]): Observable<any> {
    const url = `${Config.apiRoot}blogrolls`;
    return this.http.request('delete', url, {
      body: {
        ids: ids
      }
    });
  }
}
