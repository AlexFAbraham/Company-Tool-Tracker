import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  type: string;
  address: string;
  contacts: string;
  status: string;
}

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
})
export class AddEditModalComponent implements OnInit {
  statusOptions = ['Researching', 'Pending Approval', 'Approved', 'Declined'];

  listContacts: any[] = [];
  companyInfoForm: any;
  constructor(
    public dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.companyInfoForm = this.formBuilder.group({
      name: new FormControl(''),
      type: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(''),
      contacts: this.formBuilder.array([
        this.formBuilder.group({
          contactName: new FormControl([]),
          contactPhone: new FormControl([]),
          contactEmail: new FormControl([]),
        }),
      ]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addContacts(): void {
    const contactsForm = this.formBuilder.group({
      contactName: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
    });
    (<FormArray>this.companyInfoForm.get('contacts')).push(contactsForm);

    this.listContacts.push(this.listContacts.length);
    // console.log(this.listContacts);
  }

  onDelete(index: any): void {
    let listArray = this.companyInfoForm.get('contacts') as FormArray;
    listArray.removeAt(index);
  }

  get contactControls() {
    return (<FormArray>this.companyInfoForm.get('contacts')).controls;
  }
}
