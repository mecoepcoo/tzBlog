import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { LoginService } from '../share/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [
    LoginService
  ]
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;

  admin: string;

  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.admin = (<any>this._cookieService.getObject('login')).name;
  }

  doLogout() {
    this._loginService.doLogout()
      .subscribe(data => {
        if (data.status === 200) {
          this.router.navigate(['/login']);
        }
      }, error => {
        console.error(error);
      });
  }

}
