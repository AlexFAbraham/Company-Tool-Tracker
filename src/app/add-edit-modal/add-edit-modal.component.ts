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
  addEditHeader: string;
  isNameDisabled: boolean = false;
  statusOptions = ['Researching', 'Pending Approval', 'Approved', 'Declined'];
  listContacts: any[] = [];
  companyInfoForm: any;
  firstAdd: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.companyInfoForm = this.formBuilder.group({
      name:
        new FormControl(this.data?.name, [Validators.required]) ||
        new FormControl(''),
      type:
        new FormControl(this.data?.type, [Validators.required]) ||
        new FormControl(''),
      address:
        new FormControl(this.data?.address, [Validators.required]) ||
        new FormControl(''),
      status:
        new FormControl(this.data?.status, [Validators.required]) ||
        new FormControl(''),
      contacts: this.formBuilder.array([
        this.formBuilder.group({
          contactName: new FormControl([]),
          contactPhone: new FormControl([]),
          contactEmail: new FormControl([]),
        }),
      ]),
    });

    this.companyInfoForm.value.name
      ? ((this.addEditHeader = `Edit ${this.companyInfoForm.value.name}`),
        this.companyInfoForm.controls['name'].disable(),
        this.populateContacts(),
        (this.companyInfoForm = this.companyInfoForm))
      : (this.addEditHeader = 'Add Company');

    if (this.companyInfoForm.value.name) {
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addContacts(): void {
    const contactsForm = this.formBuilder.group({
      contactName: [],
      contactPhone: [],
      contactEmail: [],
    });

    (<FormArray>this.companyInfoForm.get('contacts')).push(contactsForm);

    this.listContacts.push(this.listContacts.length);

    if (this.companyInfoForm.get('contacts').length === 2 && !this.firstAdd) {
      (<FormArray>this.companyInfoForm.get('contacts')).removeAt(0);
      this.firstAdd = true;
    }
  }

  onDelete(index: any): void {
    let listArray = this.companyInfoForm.get('contacts') as FormArray;
    listArray.removeAt(index);
  }

  populateContacts(): void {
    for (const row in this.data.contactName) {
      const contactsForm = this.formBuilder.group({
        contactName: [this.data.contactName[row]],
        contactPhone: [this.data.contactPhone[row]],
        contactEmail: [this.data.contactEmail[row]],
      });

      (<FormArray>this.companyInfoForm.get('contacts')).push(contactsForm);
    }
    this.listContacts.push(this.listContacts.length);

    (<FormArray>this.companyInfoForm.get('contacts')).removeAt(0);
  }

  get contactControls() {
    return (<FormArray>this.companyInfoForm.get('contacts')).controls;
  }

  onSave(): void {}
}
