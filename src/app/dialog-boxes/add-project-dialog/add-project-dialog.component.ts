import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {
  update:boolean = false;

  id:string;
  name:string;
  description:string;

  constructor(private dialogRef:MatDialogRef<AddProjectDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data) {
    if(data) {
      this.update = true;
      this.name = data.name;
      this.description = data.description;
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if(!this.name) {
      return;
    }
    const data = {
      id: this.id,
      name: this.name,
      description: this.description
    };

    this.dialogRef.close(data);
  }

  onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.save();
  }
}
}
