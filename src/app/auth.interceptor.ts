/*
import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('token') ?? '';
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return next(request);
};
*/

/* 
import { HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, switchMap, finalize } from "rxjs";
import { AuthResponse } from "./interfaces/AuthResponse";
import { ApiService } from "./services/api/api.service";
import { AuthService } from "./services/auth/auth.service";

@Injectable()
export class AuthInterceptor {
  private isRefreshing = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = localStorage.getItem('token') ?? '';
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('request url', request.url.includes('refresh'));
        if (error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            const refreshToken = localStorage.getItem('refresh-token') || '';
            
            if (!refreshToken) {
              this.isRefreshing = false;
              return throwError(() => "No refresh token available");
            }
            return this.apiService.getNewToken(refreshToken).pipe(
              switchMap((response: AuthResponse) => {
                console.log('switchMap response', response);
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refresh-token', response.refreshToken);
                this.authService.currentUserSig.set(response);
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                });
                console.log('request 2', request);
                return next.handle(request);
              }),
              catchError((refreshError) => {
                console.error('Token refresh error:', refreshError);
                return throwError(() => "Token refresh failed");
              }),
              finalize(() => {
                this.isRefreshing = false;
              })
            );
          }
        }
        return throwError(() => "Authentication failed");
      })
    );
  }
}
*/

/*
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { ApiService } from './services/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiService = inject(ApiService);
    let authRequest = request;
   
    authRequest = this.addTokenHeader(request, localStorage.getItem('token') ?? "");
    
    return next.handle(authRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.handleRefreshToken(request, next);
        } 
      })
    );

  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    const apiService = inject(ApiService);

    if(localStorage.getItem('refresh-token') !== null){

    return apiService.getNewToken(localStorage.getItem('refresh-token')).pipe(
      switchMap((data: any) => {
        console.log(data);
        return next.handle(this.addTokenHeader(request, data.jwtToken))
      }),
      catchError(err => {
        return throwError(()=> err)
      })
    );
  }
}

  addTokenHeader(request: HttpRequest<any>, token: String) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }


}
*/
/*
import { HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, switchMap, finalize } from "rxjs";
import { AuthResponse } from "./interfaces/AuthResponse";
import { ApiService } from "./services/api/api.service";
import { AuthService } from "./services/auth/auth.service";

@Injectable()
export class AuthInterceptor {
  private isRefreshing = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessTokenFromLocalStorage()}`,
      },
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        //console.log('request url', request.url.includes('refresh'));
        if (error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            const refreshToken = localStorage.getItem('refresh-token') || '';
            console.log('refreshToken', refreshToken);
            if (!refreshToken) {
              this.isRefreshing = false;
              return throwError(() => "No refresh token available");
            }
            return this.apiService.getNewToken2(refreshToken).pipe(
              switchMap((response: AuthResponse) => {
                console.log('switchMap response', response);
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refresh-token', response.refreshToken);
                this.authService.currentUserSig.set(response);
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                });
                return next.handle(request);
              }),
              catchError((refreshError) => {
                console.error('Token refresh error:', refreshError);
                return throwError(() => "Token refresh failed");
              }),
              finalize(() => {
                this.isRefreshing = false;
              })
            );
          }
        }
        return throwError(() => "Authentication failed");
      })
    );
  }
}
*/

/*
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, of, throwError } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { ApiService } from "./services/api/api.service";
import { AuthResponse } from "./interfaces/AuthResponse";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) { }

  attempts = 0;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (err && err.status === 401 && this.attempts !== 1) {
      this.attempts++;
      const refreshToken = this.authService.getRefreshTokenFromLocalStorage();
      this.apiService.getNewToken2(refreshToken).subscribe({
        next: (data: AuthResponse) => {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refresh-token', data.refreshToken);
          return of('Tokens refreshed');
        },
        error: (error) => {
          return of(error);
        }
      })
    }
    this.attempts = 0;
    return throwError(() => new Error('Something went wrong'));
  }
}
*/

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
    // console.log(req.url);
    // console.log(req.url.endsWith('auth/refresh2'));
    // console.log('headerNeeded', this.isHeaderNeeded(req.url));

    if (this.authService.getAccessTokenFromLocalStorage() && this.isHeaderNeeded(req.url)) {
      req = this.setToken(req, this.authService.getAccessTokenFromLocalStorage());
    }

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('catchError error', error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handler401Error(req, next, error);
        } else {
          console.log('Error status unknown!');
          return this.logout(error);
        }
      }))
  }

  handler401Error(req: HttpRequest<any>, next: HttpHandler, error: any): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      console.log('Refreshing token...');
      return this.apiService.getNewToken2().pipe(
        switchMap(success => {
          console.log('success', success);
          if (success) {
            localStorage.setItem('token', success.accessToken);
            req = this.setToken(req, success.accessToken);
            this.authService.currentUserSig.set(success);
            return next.handle(req);
          } else {
            return this.logout(error);
          }
        }),
        /*
        catchError(err => {
          console.log(err);
          console.log('Error in refresh token request!');
          return this.logout(err);
        }),
        */
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