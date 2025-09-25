import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, switchMap } from 'rxjs';

export type Me = { _id: string; name: string; email: string; role: 'customer' | 'admin' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey = 'shopsphere_token';
  me$ = new BehaviorSubject<Me | null>(null);

  get token(): string | null { return localStorage.getItem(this.tokenKey); }
  set token(v: string | null) { v ? localStorage.setItem(this.tokenKey, v) : localStorage.removeItem(this.tokenKey); }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`http://localhost:4000/api/auth/login`, { email, password })
      .pipe(
        tap(({ token }) => { this.token = token; }),
        switchMap(() => this.fetchMe())
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ token: string }>(`http://localhost:4000/api/auth/register`, { name, email, password })
      .pipe(
        tap(({ token }) => { this.token = token; }),
        switchMap(() => this.fetchMe())
      );
  }

  logout() { this.token = null; this.me$.next(null); this.router.navigateByUrl('/login'); }

  fetchMe() {
    return this.http.get<Me>(`http://localhost:4000/api/auth/me`).pipe(tap((me) => this.me$.next(me)));
  }
}


