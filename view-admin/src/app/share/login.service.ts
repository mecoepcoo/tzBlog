import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from '../share/config';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }

    /* 获取验证码 */
  getCaptcha(): Observable<any> {
    const url = `${Config.apiRoot}captcha`;
    return this.http.get(url);
  }

  /**
   * 登录操作
   * @param loginInfo 登录信息
   * {
   *  name: 'admin', // 用户名
   *  pwd: '123456', // 明文密码
   *  captcha: '10', // 验证码
   * }
   */
  doLogin(loginInfo) {
    const url = `${Config.apiRoot}login`;
    const body = JSON.stringify(loginInfo);
    return this.http.post(url, body);
  }


  /* 登出操作 */
  doLogout(): Observable<any> {
    const url = `${Config.apiRoot}logout`;
    return this.http.get(url);
  }

}
