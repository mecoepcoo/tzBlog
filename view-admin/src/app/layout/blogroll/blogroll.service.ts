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
}
