import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'src/environments/environment';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole.enum';

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

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
      _sort: '',
      _order: SortType.ASC,
      joined_gte: '',
      role: UserRole.All + '',
    }
  ): Observable<{ data: User[]; total: string | null }> {
    if (params.role === UserRole.All + '') delete params.role;
    return this._http
      .get<any>(this.baseURL, {
        params: { ...params },
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return { data: res.body, total: res.headers.get('X-Total-Count') };
        })
      );
  }
}
