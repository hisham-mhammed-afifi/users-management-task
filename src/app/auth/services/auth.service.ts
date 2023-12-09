import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): Observable<string> {
    const token = this.encode({ email, password });
    return this.fakeResponse<string>(token);
  }

  isAuthenticated(token: string): boolean {
    return !!token && !!this.decode(token);
  }

  private encode(data: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  }

  private decode(string: string): Record<string, any> {
    return JSON.parse(decodeURIComponent(escape(decodeURI(atob(string)))));
  }

  private fakeResponse<T>(data: T): Observable<T> {
    return of(data).pipe(delay(1000));
  }
}
