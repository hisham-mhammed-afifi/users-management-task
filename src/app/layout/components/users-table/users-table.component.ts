import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MODAL } from '../../constants/modals.constants';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  editedUser!: User;

  @Input() users: { data: User[]; total: string } = { data: [], total: '0' };
  @Output() sort_column = new EventEmitter<string>();
  @Output() user_delete = new EventEmitter<string>();
  @Output() user_edit = new EventEmitter<Partial<User>>();
  @Output() user_add = new EventEmitter<User>();

  UserRole = UserRole;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  openUserModal(user: User) {
    this.editedUser = user;
    this.modal.toggleModal(MODAL.USER);
  }
}
