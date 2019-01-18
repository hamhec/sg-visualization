import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { LoginInfo } from '../../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo:LoginInfo = new LoginInfo(null,null);

  constructor( public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

  login() {
    this.dialogRef.close(this.loginInfo);
  }
}
