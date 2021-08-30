import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  message: string = ' ';
  confirmButtonText = ' ';
  cancelButtonText = ' ';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (this.data) {
      this.message = this.data.message;
      if (this.data.buttonText) {
        this.cancelButtonText = this.data.buttonText.cancel;
        this.confirmButtonText = this.data.buttonText.confirm;
      }
    }
  }
  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
