import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private usersSrv: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersSrv.getUsers();
  }
}
