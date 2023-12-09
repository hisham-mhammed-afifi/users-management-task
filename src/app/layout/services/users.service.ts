import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}

  getUsers(
    _page = '1',
    _limit = CONSTANTS.UsersPerPage.toString()
  ): Observable<User[]> {
    return this._http.get<User[]>(this.baseURL, {
      params: { _page, _limit },
    });
  }

  get UsersLength(): Observable<number> {
    return this._http
      .get<User[]>(this.baseURL)
      .pipe(map((users) => users.length));
  }
}
