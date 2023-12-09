import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'src/environments/environment';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}

  getUsers(
    params: any = {
      q: '',
      _page: '1',
      _limit: CONSTANTS.UsersPerPage.toString(),
      joined_gte: '',
      role: UserRole.All + '',
    }
  ): Observable<User[]> {
    if (params.role === UserRole.All + '') delete params.role;
    return this._http.get<User[]>(this.baseURL, {
      params: { ...params },
    });
  }

  getUsersLength(
    params: any = {
      q: '',
      _page: '1',
      _limit: CONSTANTS.UsersPerPage.toString(),
      joined_gte: '',
      role: UserRole.All + '',
    }
  ): Observable<number> {
    delete params._page;
    delete params._limit;
    if (params.role === UserRole.All + '') delete params.role;
    return this._http
      .get<User[]>(this.baseURL, {
        params: { ...params },
      })
      .pipe(map((users) => users.length));
  }
}
