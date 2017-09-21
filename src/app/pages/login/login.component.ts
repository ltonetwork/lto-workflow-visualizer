import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '@modules/auth';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private auth: AuthService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.emailControl = new FormControl('evgeny@legalthings.io', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('ZpiRit1985', [Validators.required]);
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  async login() {
    // Disable form to prevent user click twice
    this.form.disable();
    try {
      await this.auth.login(this.emailControl.value, this.passwordControl.value);
      this.snackbar.open('Logged in', 'DISMISS', { duration: 3000 });
    } catch (err) {
      this.snackbar.open('Loggin error', 'DISMISS', { duration: 3000 });
      this.form.enable();
    }
  }
}
