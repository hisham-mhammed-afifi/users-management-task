import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../shared/components/dropdown/dropdown.component';
import { CONSTANTS } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  users$!: Observable<User[]>;
  usersLength = 0;
  usersPerPage = CONSTANTS.UsersPerPage;
  currentPage = 1;

  usersPerPageList: MenuItem[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '25', value: 25 },
  ];

  constructor(private usersSrv: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersSrv.getUsers(
      this.currentPage.toString(),
      this.usersPerPage.toString()
    );
    this.usersSrv.UsersLength.subscribe((l) => {
      this.usersLength = l;
      console.log(l);
    });
  }

  pageChange(page: string) {
    this.users$ = this.usersSrv.getUsers(page, this.usersPerPage.toString());
  }

  perPageChange(limit: string) {
    this.usersPerPage = +limit;
    this.users$ = this.usersSrv.getUsers('1', limit);
  }
}
