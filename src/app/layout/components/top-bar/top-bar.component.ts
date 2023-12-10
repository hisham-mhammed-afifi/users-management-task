import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuItem } from 'src/app/shared/components/dropdown/dropdown.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MODAL } from '../../constants/modals.constants';
import { DateFilter } from '../../models/DateFilter.enum';
import { UserRole } from '../../models/UserRole.enum';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  usersPermissionsList: MenuItem[] = [
    { label: 'All', value: UserRole.All },
    { label: 'Admin', value: UserRole.Admin },
    { label: 'Contributor', value: UserRole.Contributor },
    { label: 'Viewer', value: UserRole.Viewer },
    { label: 'Editor', value: UserRole.Editor },
  ];

  usersJoinedList: MenuItem[] = [
    { label: 'Anytime', value: DateFilter.Anytime },
    { label: 'This week', value: DateFilter.ThisWeek },
    { label: 'This month', value: DateFilter.ThisMonth },
    { label: 'This year', value: DateFilter.ThisYear },
  ];

  @Output() search_input = new EventEmitter<string>();
  @Output() joined_filter = new EventEmitter<DateFilter>();
  @Output() permissions_filter = new EventEmitter<UserRole>();
  @Output() export_pdf = new EventEmitter<void>();

  constructor(public modal: ModalService, public authSrv: AuthService) {}

  ngOnInit(): void {}

  search(e: Event) {
    this.search_input.emit((e.target as HTMLInputElement).value);
  }

  openModal(e: Event) {
    e.preventDefault();
    this.modal.toggleModal(MODAL.USER);
  }
}
