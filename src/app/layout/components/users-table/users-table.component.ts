import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LoaderType } from 'src/app/shared/models/LoadersType.enum';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MODAL } from '../../constants/modals.constants';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnChanges {
  LoaderType = LoaderType;
  editedUser!: User;
  usersCount = 0;

  @Input() loading = false;
  @Input() users: { data: User[]; total: string } = { data: [], total: '0' };
  @Output() sort_column = new EventEmitter<string>();
  @Output() user_delete = new EventEmitter<string>();
  @Output() user_edit = new EventEmitter<Partial<User>>();
  @Output() user_add = new EventEmitter<User>();

  UserRole = UserRole;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      if (changes['users'].currentValue.data.length) {
        this.usersCount = changes['users'].currentValue.data.length;
      } else {
        this.usersCount = 10;
      }
    }
  }

  openUserModal(user: User) {
    this.editedUser = user;
    this.modal.toggleModal(MODAL.USER);
  }
}
