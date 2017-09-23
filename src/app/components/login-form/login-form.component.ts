import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProcessesProviderService } from '@services/processes-provider/processes-provider.service';

import { ProjectionJsService } from '@services/projection-js/projection-js.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  processIdControl: FormControl;
  keyControl: FormControl;
  selectedFilename = '';

  loading = false;

  constructor(
    public dialogRef: MdDialogRef<LoginFormComponent>,
    public processesProvider: ProcessesProviderService,
    public snackbar: MdSnackBar,
    public projection: ProjectionJsService
  ) { }

  ngOnInit() {
    this.processIdControl = new FormControl('0x926eb19ecdf4a81116b8d27debd24044ffcae686', [Validators.required]);
    this.keyControl = new FormControl('my-test-key', [Validators.required]);
    this.form = new FormGroup({
      process: this.processIdControl,
      key: this.keyControl
    });
  }

  fileSelected(event: any) {
    const fileObj = event.target.files[0];
    this.selectedFilename = fileObj['name'];
    const reader = new FileReader();
    reader.onload = (file: any) => {
      this.keyControl.setValue(file.target.result);
    };

    reader.readAsText(fileObj);
  }

  submit() {
    this.loading = true;
    this.form.disable();

    this.processesProvider.load(this.processIdControl.value, this.keyControl.value).take(1).subscribe((process) => {
      this.snackbar.open('Logged in', 'DISMISS', {
        duration: 1500
      });

      this.dialogRef.close(true);
    }, (err) => {
      this.loading = false;
      this.form.enable();
      this.snackbar.open('Process not found', 'DISMISS', {
        duration: 3000
      });
    });
  }

}
