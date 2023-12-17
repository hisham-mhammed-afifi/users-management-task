import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CONSTANTS } from 'src/environments/environment';
import { GetUsersParams, SortType } from '../models/GetUsersParams';
import { GetUsersRes } from '../models/GetUsersRes';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}

  getUsers(
    params: GetUsersParams = {
      q: '',
      _page: '1',
      _limit: CONSTANTS.UsersPerPage.toString(),
      _sort: '',
      _order: SortType.ASC,
      joined_gte: '',
      role: '',
    }
  ): Observable<GetUsersRes> {
    if (params.role === '') delete params.role;
    return this._http
      .get<User[]>(this.baseURL, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return {
            data: res.body,
            total: res.headers.get('X-Total-Count') ?? '0',
          };
        }),
        delay(1000)
      );
  }

  addUser(user: User): Observable<User> {
    return this._http.post<User>(this.baseURL, user);
  }

  updateUser(user: Partial<User>): Observable<any> {
    return this._http.put<any>(this.baseURL + '/' + user.id, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this._http.delete<any>(this.baseURL + '/' + userId);
  }
}
