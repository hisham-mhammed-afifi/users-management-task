import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authSrv: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const token = localStorage.getItem('12345');
    if (!!token && this.authSrv.isAuthenticated(token)) {
      return true;
    }
    this.router.navigate(['auth']);
    return false;
  }
}
