import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    let header = {};
    if (request.url.includes(`${environment.baseUrl}`)) {
      header = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
        }),
      };
    }
    const newReq = request.clone({ ...header });
    return next.handle(newReq);
  }
}
