import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  usersCount = 0;

  @Input() loading = false;
  @Input() users: { data: User[]; total: string } = { data: [], total: '0' };
  @Output() sort_column = new EventEmitter<string>();
  @Output() user_delete = new EventEmitter<string>();
  @Output() edited_user = new EventEmitter<User>();

  UserRole = UserRole;

  constructor(
    private modal: ModalService,
    private translate: TranslateService
  ) {}

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
    this.edited_user.emit(user);
    this.modal.toggleModal(MODAL.USER);
  }

  translatedRole(role: UserRole): string {
    const name = UserRole[role].toUpperCase();
    return this.translate.instant(`ROLES.${name}`);
  }
}
