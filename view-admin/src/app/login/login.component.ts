import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { LoginService } from '../share/login.service';
import { from } from 'rxjs/observable/from';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild('pCaptcha') pCaptcha;
  validateForm: FormGroup;

  captcha = '';
  loginMessage = '';

  loginInfo = {
    username: '',
    password: '',
    captcha: '',
    remember: false
  };

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (!this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
  }

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private _cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.getCaptcha();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      remember: [false],
    });
  }

  /* 获取验证码 */
  getCaptcha() {
    this._loginService.getCaptcha()
      .subscribe(data => {
        if (data.status === 200) {
          this.pCaptcha.nativeElement.innerHTML = data.data;
        } else {
          this.pCaptcha.nativeElement.innerHTML = '请点击重试';
        }
      }, error => {
        this.pCaptcha.nativeElement.innerHTML = '获取失败';
      });
  }

  /* 登录操作 */
  doLogin() {
    this._loginService.doLogin(this.loginInfo)
      .subscribe(data => {
        if (data.status === 1) {
          const token = data.data.token;
          const username = data.data.username;
          const dateNow = new Date();
          const day = dateNow.getDate();
          const date = dateNow.setDate(day + 30);
          this._cookieService.putObject('login', {
            name: username,
            token: token
          }, {
            path: '/',
            expires: `${date}`
          });
          this.router.navigateByUrl('/admin');
        } else {
          this.getCaptcha();
          this.loginMessage = data.message;
        }
      }, error => {
        console.error(error);
      });
  }
}
