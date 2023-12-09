import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  submitting = false;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.submitting = true;
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;
    this.authSrv.login(email, password).subscribe((token) => {
      if (token) {
        localStorage.setItem('12345', token);
        this.router.navigate(['users-management']);
      }
    });
  }
}
