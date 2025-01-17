import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, finalize, switchMap, throwError } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { ApiService } from "./services/api/api.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private isRefreshingToken = false;

  setToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // can't send expired jwt back as header for refresh endpoint

    if (
      this.authService.getAccessTokenFromLocalStorage() &&
      this.isHeaderNeeded(req.url)
    ) {
      req = this.setToken(
        req,
        this.authService.getAccessTokenFromLocalStorage(),
      );
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handler401Error(req, next, error);
        } else {
          return this.logout(error);
        }
      }),
    );
  }

  handler401Error(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    error: unknown,
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      return this.apiService.getNewToken2().pipe(
        switchMap((successResponse) => {
          if (successResponse) {
            localStorage.setItem("token", successResponse.accessToken);
            req = this.setToken(req, successResponse.accessToken);
            this.authService.currentUserSig.set(successResponse);
            return next.handle(req);
          } else {
            return this.logout(error);
          }
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }),
      );
    }
    return throwError(() => new Error("End"));
  }

  logout(error: unknown): Observable<HttpEvent<unknown>> {
    // original thought was log user out if there was an error
    // this may be too strict and would need to be looked at further
    return throwError(() => error);
  }

  isHeaderNeeded(url: string): boolean { 
    return !url.includes("http://localhost:8080/auth/refresh2"); 
  }
}
