import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  token: string;

  constructor(
    private _cookieService: CookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this._cookieService.get('token') || '';
    if (this.token) {
      this.token = JSON.parse(this.token).token;
    }
    const httpReq = req.clone({
      withCredentials: true,
      setHeaders: { 'Content-Type': 'application/json', 'X-Access-Token': this.token},
    });
    return next.handle(httpReq)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.extraData(event.body);
        }
      })
      .catch(this.handleError);
  }

  private extraData(res) {
    const status = res.status;
    switch (status) {
      case 200:
        break;
    }
  }

  private handleError(error) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
