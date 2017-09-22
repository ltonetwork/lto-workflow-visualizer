import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  processIdControl: FormControl;
  keyControl: FormControl;

  constructor(public dialogRef: MdDialogRef<LoginFormComponent>) { }

  ngOnInit() {
    this.processIdControl = new FormControl('', [Validators.required]);
    this.keyControl = new FormControl();
    this.form = new FormGroup({
      process: this.processIdControl,
      key: this.keyControl
    });
  }

  fileSelected(event: any) {
    const fileObj = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (file: any) => {
      console.log(file.target['result']);
    };

    reader.readAsText(fileObj);
  }

  submit() {
    this.dialogRef.close({
      processId: this.processIdControl.value
    });
  }

}
