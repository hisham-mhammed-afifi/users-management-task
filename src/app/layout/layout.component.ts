import { Component, Inject, OnInit } from '@angular/core';
import { User } from './models/User';
import { SortType, UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../shared/components/dropdown/dropdown.component';
import { CONSTANTS } from 'src/environments/environment';
import { DateFilter } from './models/DateFilter.enum';
import { UserRole } from './models/UserRole.enum';
import { UtilsService } from '../shared/services/utils.service';
import { Router } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';
import { MODAL } from './constants/modals.constants';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  usersData: { data: User[]; total: string } = { data: [], total: '0' };

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
    @Inject(DOCUMENT) private document: Document,
    private usersSrv: UsersService,
    private utils: UtilsService,
    private router: Router,
    private modal: ModalService,
    public translate: TranslateService
  ) {
    // this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.getAllUsers({ ...this.getUsersParams });
  }

  parseToNum(text: string): number {
    if (isNaN(+text)) return 0;
    return Number(text);
  }

  getAllUsers(params: any) {
    this.usersSrv.getUsers(params).subscribe((data) => {
      this.usersData = data;
    });
  }

  addUser(user: User) {
    this.usersSrv.addUser(user).subscribe((user) => {
      this.getAllUsers({ ...this.getUsersParams });
      this.modal.toggleModal(MODAL.USER);
    });
  }

  editUser(user: Partial<User>) {
    this.usersSrv.updateUser(user).subscribe((user) => {
      this.getAllUsers({ ...this.getUsersParams });
      this.modal.toggleModal(MODAL.USER);
    });
  }

  deleteUser(userId: string) {
    this.usersSrv.deleteUser(userId).subscribe((res) => {
      this.getAllUsers({ ...this.getUsersParams });
    });
  }

  pageChange(page: string) {
    this.getUsersParams._page = page;
    this.getAllUsers({
      ...this.getUsersParams,
      _page: page,
    });
  }

  perPageChange(limit: string) {
    this.getUsersParams._limit = limit;
    this.getAllUsers({
      ...this.getUsersParams,
      _limit: limit,
    });
  }

  searchUsers(term: string) {
    this.getUsersParams._page = '1';
    this.getUsersParams.q = term;
    this.getAllUsers({ ...this.getUsersParams, q: term });
  }

  filterByJoined(filter: DateFilter) {
    this.getUsersParams._page = '1';
    this.getUsersParams.joined_gte = this.getStartDate(filter).toISOString();
    this.getAllUsers({
      ...this.getUsersParams,
      joined_gte: this.getStartDate(filter).toISOString(),
    });
  }

  filterByPermissions(role: number) {
    this.getUsersParams._page = '1';
    this.getUsersParams.role = role;
    if (role === UserRole.All) {
      this.getUsersParams.role = '';
    }
    this.getAllUsers({ ...this.getUsersParams, role });
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
    this.getAllUsers({
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
