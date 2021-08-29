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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.companyInfoForm = this.formBuilder.group({
      name: this.data?.name || new FormControl(''),
      type: this.data?.type || new FormControl(''),
      address: this.data?.address || new FormControl(''),
      status: this.data?.status || new FormControl(''),
      contacts: this.formBuilder.array([
        this.formBuilder.group({
          contactName: new FormControl([]),
          contactPhone: new FormControl([]),
          contactEmail: new FormControl([]),
        }),
      ]),
    });

    // contactName: this.data?.contactName[0] || new FormControl([]),
    // contactPhone: this.data?.contactPhone[0] || new FormControl([]),
    // contactEmail: this.data?.contactEmail[0] || new FormControl([]),
    console.log(this.companyInfoForm.value.contact);
    this.companyInfoForm.setCon;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addContacts(): void {
    const contactsForm = this.formBuilder.group({
      contactName: this.data?.contactName || [],
      contactPhone: this.data?.contactPhone || [],
      contactEmail: this.data?.contactEmail || [],
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
