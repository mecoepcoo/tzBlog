import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  /* 获取分类 */
  getCategories(): Observable<any> {
    const url = `${Config.apiRoot}categories`;
    return this.http.get(url);
  }
}
