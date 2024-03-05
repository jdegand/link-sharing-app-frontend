import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('token') ?? '';
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return next(request);
};

/*
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, switchMap, throwError } from "rxjs";
import { ApiService } from "./services/api/api.service";
import { inject } from "@angular/core";
import { AuthResponse } from "./interfaces/AuthResponse";

export const authInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn) => {

  const apiService = inject(ApiService);

  const token = localStorage.getItem('token') ?? '';
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Should be 401 error -> backend needs rework 
        const refreshToken = localStorage.getItem('refresh-token') ?? '';

        return apiService.getNewToken(refreshToken).pipe(
          switchMap((response: AuthResponse) => {
            console.log('switchMap response', response)
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });
            return next(request);
          }),
          catchError((refreshError) => {
            // Handle refresh token error
            return throwError(() => new Error(refreshError));
          })
        );
      }

      throw new Error("Authentication failed");
    })
  );
};
*/