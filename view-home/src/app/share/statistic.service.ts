import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class StatisticService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取数据统计信息 */
  getStatistic(): Observable<any> {
    const url = `${Config.apiRoot}statistics`;
    return this.http.get(url);
  }
}
