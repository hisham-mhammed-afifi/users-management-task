import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}

  getUsers(_page = '1', _limit = '10'): Observable<User[]> {
    return this._http.get<User[]>(this.baseURL, {
      params: { _page, _limit },
    });
  }
}
