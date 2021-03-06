import { Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface COMPANIES_DATA {
  id: number;
  name: string;
  type: number;
  address: number;
  employees: string[];
  status: string;
}

const COMPANIES_DATA = [
  {
    id: 1,
    name: 'Tesla ',
    type: 'Car Manufacturing',
    address: '3500 Deer Creek Road',
    isExpanded: false,
    employees: [
      {
        eName: 'Elon Musk',
        ePhone: '(678)-362-9873',
        eEmail: 'Elon.Musk@tesla.com',
      },
      {
        eName: 'Fred Erikson',
        ePhone: '(404)-917-7804',
        eEmail: 'Fred.Erikson@tesla.com',
      },
      {
        eName: 'Naruto Uzamaki',
        ePhone: '(913)-892-9071',
        eEmail: 'Naruto.Uzamaki@tesla.com',
      },
    ],
    status: 'Researching',
  },
  {
    id: 2,
    name: 'AMD',
    type: 'Computer Parts',
    address: '2485 Augustine Road Santa Clara',
    isExpanded: false,
    employees: [
      {
        eName: 'Lisa Su',
        ePhone: '(412)-829-2389',
        eEmail: 'Lisa.Su@amd.com',
      },
      {
        eName: 'Leo Jackson',
        ePhone: '(910)-829-6739',
        eEmail: 'Leo.Jackson@amd.com',
      },
      {
        eName: 'Eren Yeager',
        ePhone: '(921)-894-7831',
        eEmail: 'Eren.Yeager@amd.com',
      },
    ],
    status: 'Pending Approval',
  },
  {
    id: 3,
    name: 'Insiten',
    type: 'Software Company',
    address: '147 Technology Pkwy STE 200',
    isExpanded: false,
    employees: [
      {
        eName: 'Adam Trien',
        ePhone: '(437)-543-8925',
        eEmail: 'Adam.Trien@insiten.com',
      },
      {
        eName: 'Gentry Ganote',
        ePhone: '(784)-383-9812',
        eEmail: 'Gentry.Ganote@insiten.com',
      },
      {
        eName: 'Matt Osher',
        ePhone: '(734)-894-0912',
        eEmail: 'Matt.Osher@insiten.com',
      },
      {
        eName: 'Liz Meyers',
        ePhone: '(836)-745-7514',
        eEmail: 'Liz.Myers@insiten.com',
      },
    ],
    status: 'Approved',
  },
  {
    id: 4,
    name: 'Amazon',
    type: 'Online Retailer',
    address: '410 Terry Ave N',
    isExpanded: false,

    employees: [
      {
        eName: 'Jeff Bezos',
        ePhone: '(217)-327-8734',
        eEmail: 'Jeff.Bezos@amazon.com',
      },
      {
        eName: 'Andy Jassy',
        ePhone: '(321)-342-5436',
        eEmail: 'Andy.Jassey@amazon.com',
      },
    ],
    status: 'Declined',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}
  responseToPush = {};

  isTableExpanded = false;
  dataofCompanies: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<COMPANIES_DATA>;

  companyColumns: string[] = [
    'id',
    'name',
    'type',
    'address',
    'contacts',
    'status',
    ' ',
  ];

  ngAfterViewInit(): void {
    this.dataofCompanies.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataofCompanies.data = [...COMPANIES_DATA];
  }

  onAddEdit() {
    let dialogRef = this.dialog.open(AddEditModalComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      const employeeArray = [];

      for (const numberOfContacts in result.controls.contacts.controls) {
        employeeArray.push({
          eName:
            result.controls.contacts.controls[numberOfContacts].value
              .contactName,
          ePhone:
            result.controls.contacts.controls[numberOfContacts].value
              .contactPhone,
          eEmail:
            result.controls.contacts.controls[numberOfContacts].value
              .contactEmail,
        });
      }

      this.dataofCompanies.data.push({
        id: COMPANIES_DATA.length + 1,
        name: result.controls.name.value,
        type: result.controls.type.value,
        address: result.controls.address.value,
        isExpanded: false,
        employees: employeeArray,
        status: result.controls.status.value,
      });

      this.dataofCompanies.data = this.dataofCompanies.data;
    });

    this.table.renderRows();
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataofCompanies.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }
  editItem(index: any): void {
    const currentValue: any = this.dataofCompanies.data.filter(
      (row: any) => row.id === index
    );
    const employeesName = [];
    const employeesPhone = [];
    const employeesEmail = [];

    for (const numberOfContacts in currentValue[0]?.employees) {
      employeesName.push(currentValue[0].employees[numberOfContacts].eName);
      employeesPhone.push(currentValue[0].employees[numberOfContacts].ePhone);
      employeesEmail.push(currentValue[0].employees[numberOfContacts].eEmail);
    }

    let dialogRef = this.dialog.open(AddEditModalComponent, {
      data: {
        name: currentValue[0]?.name,
        type: currentValue[0]?.type,
        address: currentValue[0]?.address,
        status: currentValue[0]?.status,
        contactName: employeesName,
        contactPhone: employeesPhone,
        contactEmail: employeesEmail,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const employeeArrayList = [];
      for (const numberOfContacts in result.value.contacts) {
        employeeArrayList.push({
          eName: result.value.contacts[numberOfContacts].contactName,
          ePhone: result.value.contacts[numberOfContacts].contactPhone,
          eEmail: result.value.contacts[numberOfContacts].contactEmail,
        });
      }

      const replaceRowIdx = this.dataofCompanies.data.findIndex(
        (row: any) => row.name === result.controls.name.value
      );

      this.dataofCompanies.data[replaceRowIdx] = {
        id: this.dataofCompanies.data[replaceRowIdx].id,
        name: result.controls.name.value,
        type: result.value.type,
        address: result.value.address,
        status: result.value.status,
        employees: employeeArrayList,
      };

      this.dataofCompanies.data = this.dataofCompanies.data;

      this.table.renderRows();
    });
  }

  deleteItem(index: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          cancel: 'Cancel',
          confirm: 'Delete',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const deleteRowIdx = this.dataofCompanies.data.findIndex(
          (row: any) => row.id === index
        );
        const snack = this.snackBar.open('Delete Succesfull', 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        this.dataofCompanies.data.splice(deleteRowIdx, 1);
        this.dataofCompanies.data = this.dataofCompanies.data;
        this.table.renderRows();
      }
    });
  }
}
