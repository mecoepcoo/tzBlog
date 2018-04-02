import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class OtherService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取 */
  getOthers(): Observable<any> {
    const url = `${Config.apiRoot}others`;
    return this.http.get(url);
  }
}
