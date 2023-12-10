import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { SortType, UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../shared/components/dropdown/dropdown.component';
import { CONSTANTS } from 'src/environments/environment';
import { DateFilter } from './models/DateFilter.enum';
import { UserRole } from './models/UserRole.enum';
import { UtilsService } from '../shared/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  users$!: Observable<{ data: User[]; total: string | null }>;
  usersLength = 0;

  getUsersParams: any = {
    _limit: CONSTANTS.UsersPerPage.toString(),
    q: '',
    _page: '1',
    _sort: '',
    _order: SortType.ASC,
    joined_gte: '',
    joined_lte: new Date().toISOString(),
    role: UserRole.All + '',
  };

  usersPerPageList: MenuItem[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '25', value: 25 },
  ];

  constructor(
    private usersSrv: UsersService,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersSrv.getUsers({ ...this.getUsersParams });
    this.setUserLength();
  }

  setUserLength() {
    this.users$.subscribe((res) => {
      if (res && res.total) {
        this.usersLength = +res.total;
      }
    });
  }

  pageChange(page: string) {
    this.getUsersParams._page = page;
    this.users$ = this.usersSrv.getUsers({
      ...this.getUsersParams,
      _page: page,
    });
    this.setUserLength();
  }

  perPageChange(limit: string) {
    this.getUsersParams._limit = limit;
    this.users$ = this.usersSrv.getUsers({
      ...this.getUsersParams,
      _limit: limit,
    });
    this.setUserLength();
  }

  searchUsers(term: string) {
    this.getUsersParams._page = '1';
    this.getUsersParams.q = term;
    this.users$ = this.usersSrv.getUsers({ ...this.getUsersParams, q: term });
    this.setUserLength();
  }

  filterByJoined(filter: DateFilter) {
    this.getUsersParams._page = '1';
    this.getUsersParams.joined_gte = this.getStartDate(filter).toISOString();
    this.users$ = this.usersSrv.getUsers({
      ...this.getUsersParams,
      joined_gte: this.getStartDate(filter).toISOString(),
    });
    this.setUserLength();
  }

  filterByPermissions(role: number) {
    this.getUsersParams._page = '1';
    this.getUsersParams.role = role;
    if (role === UserRole.All) {
      this.getUsersParams.role = '';
    }
    this.users$ = this.usersSrv.getUsers({ ...this.getUsersParams, role });
    this.setUserLength();
  }

  sortUsers(prop: string) {
    if (this.getUsersParams._sort === prop) {
      if (this.getUsersParams._order === SortType.ASC) {
        this.getUsersParams._order = SortType.DESC;
      } else {
        this.getUsersParams._order = SortType.ASC;
      }
    }
    this.getUsersParams._sort = prop;
    this.users$ = this.usersSrv.getUsers({
      ...this.getUsersParams,
      _sort: prop,
    });
  }

  exportPDF() {
    const table = document.getElementById('usersData');
    if (!table) return;
    this.utils.exportPDF(table);
  }

  getStartDate(filter: DateFilter): Date {
    let now = new Date();
    let start = new Date(0);
    switch (filter) {
      case DateFilter.ThisWeek:
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case DateFilter.ThisMonth:
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case DateFilter.ThisYear:
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        start = new Date(0);
        break;
    }

    return start;
  }

  logout() {
    localStorage.removeItem('12345');
    this.router.navigate(['auth']);
  }
}
