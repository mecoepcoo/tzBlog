import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class TagService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取标签 */
  getTags(): Observable<any> {
    const url = `${Config.apiRoot}tags`;
    return this.http.get(url);
  }
}
