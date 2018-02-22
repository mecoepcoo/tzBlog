import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from './config';

@Injectable()
export class TagService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

  /* 获取标签列表 */
  getTag(): Observable<any> {
    const url = `${Config.apiRoot}tags`;
    return this.http.get(url);
  }
}
