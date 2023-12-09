import { Component, OnInit, Input } from '@angular/core';
import { User, UserRole } from '../../models/User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() users: User[] | null = [];

  UserRole = UserRole;

  constructor() {}

  ngOnInit(): void {}
}
