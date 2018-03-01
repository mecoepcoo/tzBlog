import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from './config';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取分类列表 */
  getCategory(): Observable<any> {
    const url = `${Config.apiRoot}categories`;
    return this.http.get(url);
  }

  /* 新增分类 */
  addCategory(name: string): Observable<any> {
    const url = `${Config.apiRoot}categories`;
    return this.http.post(url, {
      name: name
    });
  }

  /* 修改分类 */
  editCategory(id: string, name: string): Observable<any> {
    const url = `${Config.apiRoot}categories/${id}`;
    return this.http.put(url, {
      name: name,
    });
  }

  /* 删除分类 */
  removeCategory(id: string): Observable<any> {
    const url = `${Config.apiRoot}categories/${id}`;
    return this.http.delete(url);
  }
}
