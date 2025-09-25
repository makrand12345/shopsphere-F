import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('shopsphere_token');
  if (token && req.url.startsWith('http://localhost:4000/')) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      if (err && err.status === 401) {
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};


