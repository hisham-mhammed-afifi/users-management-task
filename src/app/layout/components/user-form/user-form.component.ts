import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MODAL } from '../../constants/modals.constants';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole.enum';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  modalID = MODAL.USER;
  UserRole = UserRole;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  address = new FormControl('', [Validators.required, Validators.minLength(3)]);
  role = new FormControl(UserRole.Viewer, [Validators.required]);

  userForm = new FormGroup({
    name: this.name,
    email: this.email,
    address: this.address,
    role: this.role,
  });

  saving = false;

  constructor(
    public modal: ModalService,
    private utils: UtilsService,
    private userSrv: UsersService
  ) {}

  ngOnInit(): void {
    this.modal.register(MODAL.USER);
  }

  addUser() {
    this.saving = true;
    const { name, email, address, role } = this.userForm.value;

    if (!name || !email || !address || role === undefined || role === null)
      return;
    const user: User = new User(
      name,
      email,
      address,
      `assets/images/profile-${this.utils.randomNumber()}.png`,
      role
    );

    this.userSrv.addUser(user).subscribe((user) => {
      this.modal.toggleModal(MODAL.USER);
    });
  }

  ngOnDestroy() {
    this.modal.unregister(MODAL.USER);
  }
}
