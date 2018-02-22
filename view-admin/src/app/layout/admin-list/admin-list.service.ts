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
}
