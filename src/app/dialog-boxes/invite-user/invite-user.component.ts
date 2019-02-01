import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import {AgentService} from '../../shared';

import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  filteredUsers: String[] = [];
  usersForm: FormGroup;
  isLoading = false;

  constructor(private dialogRef:MatDialogRef<InviteUserComponent>,
  @Inject(MAT_DIALOG_DATA) data, private fb:FormBuilder, private agentService:AgentService) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    })
    this.usersForm
    .get('userInput')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.agentService.search(value)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(users => this.filteredUsers = users);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    let username = this.usersForm.controls['userInput'].value;
    const data = {
      username: username
    };

    this.dialogRef.close(data);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.save();
    }
  }
}
