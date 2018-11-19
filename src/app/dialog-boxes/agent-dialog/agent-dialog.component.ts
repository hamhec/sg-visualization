import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-agent-dialog',
  templateUrl: './agent-dialog.component.html',
  styleUrls: ['./agent-dialog.component.css']
})
export class AgentDialogComponent implements OnInit {

  title:string = "Add Agent";

  name:string;
  email:string;

  constructor(private dialogRef:MatDialogRef<AgentDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data) {
    if(data) {
      this.name = data.name;
      this.email = data.email;
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const data = {
      name: this.name,
      email: this.email
    };

    this.dialogRef.close(data);
  }

  onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.save();
  }
}
}
