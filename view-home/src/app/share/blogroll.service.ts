import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class BlogrollService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取友链列表 */
  getBlogroll(): Observable<any> {
    const url = `${Config.apiRoot}blogrolls`;
    return this.http.get(url);
  }
}
