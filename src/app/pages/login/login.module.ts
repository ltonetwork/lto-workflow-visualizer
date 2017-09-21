import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule,
    FlexLayoutModule,
    MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule,
    RouterModule.forChild([{
      path: '',
      component: LoginComponent
    }])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
