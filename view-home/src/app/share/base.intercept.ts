import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpReq = req.clone();
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
