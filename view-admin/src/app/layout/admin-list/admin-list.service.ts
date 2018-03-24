import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from '../../share/config';

@Injectable()
export class AdminListService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取管理员列表 */
  getAdminList(page, size): Observable<any> {
    const url = `${Config.apiRoot}adminusers`;
    const options = {
      params: {
        page: page,
        pagesize: size
      }
    };
    return this.http.get(url, options);
  }

  /* 新增 */
  addAdminUser(name: string, password: string, group: string): Observable<any> {
    const url = `${Config.apiRoot}adminusers`;
    return this.http.post(url, {
      adminName: name,
      password: password,
      group: group
    });
  }

  /* 修改 */
  editAdminUser(id: string, name: string, password: string, group: string): Observable<any> {
    const url = `${Config.apiRoot}adminusers/${id}`;
    return this.http.put(url, {
      name: name,
      password: password,
      group: group
    });
  }

  /* 删除 */
  removeAdminUser(id: string): Observable<any> {
    const url = `${Config.apiRoot}adminusers/${id}`;
    return this.http.delete(url);
  }
}
