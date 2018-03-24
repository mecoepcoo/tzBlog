import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from './config';

@Injectable()
export class AdminGroupService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取管理组列表 */
  getAdminGroup(): Observable<any> {
    const url = `${Config.apiRoot}admingroups`;
    return this.http.get(url);
  }

  /* 新增 */
  addAdminGroup(name: string, auth: string[]): Observable<any> {
    const url = `${Config.apiRoot}admingroups`;
    return this.http.post(url, {
      groupname: name,
      auth: JSON.stringify(auth)
    });
  }

  /* 修改 */
  editAdminGroup(id: string, name: string, auth: string[]): Observable<any> {
    const url = `${Config.apiRoot}admingroups/${id}`;
    return this.http.put(url, {
      groupname: name,
      auth: JSON.stringify(auth)
    });
  }

  /* 删除 */
  removeAdminGroup(id: string): Observable<any> {
    const url = `${Config.apiRoot}admingroups/${id}`;
    return this.http.delete(url);
  }

  getAdminAuth(): Observable<any> {
    const url = `${Config.apiRoot}adminauth`;
    return this.http.get(url);
  }
}
