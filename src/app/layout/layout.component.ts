import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { UsersService } from './services/users.service';
import { MenuItem } from '../shared/components/dropdown/dropdown.component';
import { CONSTANTS } from 'src/environments/environment';
import { DateFilter } from './models/DateFilter.enum';
import { UtilsService } from '../shared/services/utils.service';
import { Router } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';
import { MODAL } from './constants/modals.constants';
import { TranslateService } from '@ngx-translate/core';
import { UserRole } from './models/UserRole.enum';
import { ToastrService } from 'ngx-toastr';
import { GetUsersParams, SortType } from './models/GetUsersParams';
import { GetUsersRes } from './models/GetUsersRes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  lodingUsers = false;
  usersData: GetUsersRes = { data: [], total: '0' };
  editedUser!: User;

  getUsersParams: GetUsersParams = {
    _limit: CONSTANTS.UsersPerPage.toString(),
    q: '',
    _page: '1',
    _sort: '',
    _order: SortType.ASC,
    joined_gte: '',
    joined_lte: new Date().toISOString(),
    role: '',
  };

  usersPerPageList: MenuItem[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '25', value: 25 },
  ];

  constructor(
    private usersSrv: UsersService,
    private utils: UtilsService,
    private router: Router,
    private modal: ModalService,
    public translate: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers({ ...this.getUsersParams });
  }

  parseToNum(text: string): number {
    return this.utils.parseToNum(text);
  }

  getAllUsers(params: any) {
    this.lodingUsers = true;
    this.usersSrv.getUsers(params).subscribe({
      next: (data) => {
        this.usersData = data;
        this.lodingUsers = false;
      },
      error: () => {
        this.toastr.error(this.translate.instant('APP.TOASTER.ERR_MSG'));
      },
    });
  }

  addUser(user: User) {
    this.usersSrv.addUser(user).subscribe({
      next: (user) => {
        this.getAllUsers({ ...this.getUsersParams });
        this.modal.toggleModal(MODAL.USER);
        this.toastr.success(
          this.translate.instant('APP.TOASTER.ADD_USER', { name: user.name })
        );
      },
      error: () => {
        this.toastr.error(this.translate.instant('APP.TOASTER.ERR_MSG'));
      },
    });
  }

  editUser(user: Partial<User>) {
    this.usersSrv.updateUser(user).subscribe({
      next: (user) => {
        this.getAllUsers({ ...this.getUsersParams });
        this.modal.toggleModal(MODAL.USER);
        this.toastr.success(
          this.translate.instant('APP.TOASTER.EDIT_USER', { name: user.name })
        );
      },
      error: () => {
        this.toastr.error(this.translate.instant('APP.TOASTER.ERR_MSG'));
      },
    });
  }

  deleteUser(userId: string) {
    this.usersSrv.deleteUser(userId).subscribe({
      next: (res) => {
        this.getAllUsers({ ...this.getUsersParams });
        this.toastr.success(this.translate.instant('APP.TOASTER.DELETE_USER'));
      },
      error: () => {
        this.toastr.error(this.translate.instant('APP.TOASTER.ERR_MSG'));
      },
    });
  }

  pageChange(page: string) {
    this.getUsersParams._page = page;
    this.getAllUsers({
      ...this.getUsersParams,
      _page: page,
    });
  }

  pageLimitChange(limit: string) {
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
    this.getUsersParams.joined_gte = this.utils
      .getStartDate(filter)
      .toISOString();
    this.getAllUsers({
      ...this.getUsersParams,
      joined_gte: this.utils.getStartDate(filter).toISOString(),
    });
  }

  filterByPermissions(role: number) {
    this.getUsersParams._page = '1';
    this.getUsersParams.role = role + '';
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

  exportTablePDF() {
    const users = [...(<User[]>this.usersData.data)].map((user: any) => {
      return {
        ...this.utils.stringifyObjectValues(user),
        joined: new Intl.DateTimeFormat('en-US').format(new Date(user.joined)),
        role: UserRole[user.role],
      };
    });

    const headers = ['id', 'name', 'email', 'address', 'joined', 'role'];
    this.utils.exportTablePDF(users, headers);
  }

  logout() {
    localStorage.removeItem('12345');
    this.router.navigate(['auth']);
  }
}
