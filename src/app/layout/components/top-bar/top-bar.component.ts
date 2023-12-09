import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/app/shared/components/dropdown/dropdown.component';
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
  @Output() export_pdf = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  search(e: Event) {
    this.search_input.emit((e.target as HTMLInputElement).value);
  }
}
