import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, finalize, switchMap, throwError } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { ApiService } from "./services/api/api.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private isRefreshingToken = false;

  setToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // can't send expired jwt back as header for refresh endpoint

    if (this.authService.getAccessTokenFromLocalStorage() && this.isHeaderNeeded(req.url)) {
      req = this.setToken(req, this.authService.getAccessTokenFromLocalStorage());
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handler401Error(req, next, error);
        } else {
          return this.logout(error);
        }
      }))
  }

  handler401Error(req: HttpRequest<any>, next: HttpHandler, error: any): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      return this.apiService.getNewToken2().pipe(
        switchMap(success => {
          if (success) {
            localStorage.setItem('token', success.accessToken);
            req = this.setToken(req, success.accessToken);
            this.authService.currentUserSig.set(success);
            return next.handle(req);
          } else {
            return this.logout(error);
          }
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      )
    }
    return throwError(() => new Error('End'));
  }

  logout(error: any): Observable<HttpEvent<any>> {
    // router navigate to login?
    return throwError(() => new Error("logout"));
  }

  isHeaderNeeded(url: string) {
    return url.includes("http://localhost:8080/auth/refresh2") ? false : true;
  }

}