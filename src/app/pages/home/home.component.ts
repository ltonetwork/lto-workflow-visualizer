import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';


import { LoginFormComponent } from '@components/login-form/login-form.component';

declare var thesaas: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',
    './css/core.min.css',
    './css/thesaas.min.css',
    './css/style.css'
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MdDialog,
    public router: Router,
    public snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    thesaas.constellation();
  }

  async showLoginModal() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '300px'
    });

    const loginInfo = await dialogRef.afterClosed().toPromise();
    if (loginInfo) {
      this.snackbar.open('Logged in', 'DISMISS', {
        duration: 1500
      });

      this.router.navigate(['dashboard']);
    }
    console.log(loginInfo);
  }

}
