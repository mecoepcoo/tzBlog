import { Component } from '@angular/core';
import { LoginService } from './share/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginService
  ]
})
export class AppComponent {
  title = 'app';
  constructor(
    private _loginService: LoginService
  ) {

  }

  test() {
    this._loginService.getCaptcha()
      .subscribe(data => {
        // console.log(data);
      });
  }
}
