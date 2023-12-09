import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() users: { data: User[]; total: string | null } | null = null;
  @Output() sort_column = new EventEmitter<string>();

  UserRole = UserRole;

  constructor() {}

  ngOnInit(): void {}
}
