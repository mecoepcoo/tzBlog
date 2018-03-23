import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from '../../share/config';

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
}
