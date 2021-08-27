import { Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  COMPANIES_DATA = [
    {
      id: 1,
      name: 'Tesla ',
      type: 'Car Manufacturing',
      address: '3500 Deer Creek Road',
      isExpanded: false,
      employees: [
        {
          name: 'Elon Musk',
          phone: '(678)-362-9873',
          email: 'Elon.Musk@tesla.com',
        },
        {
          name: 'Fred Erikson',
          phone: '(404)-917-7804',
          email: 'Fred.Erikson@tesla.com',
        },
        {
          name: 'Naruto Uzamaki',
          phone: '(913)-892-9071',
          email: 'Naruto.Uzamaki@tesla.com',
        },
      ],
      status: 'Researching',
    },
    {
      id: 2,
      name: 'AMD',
      type: 'Company Parts',
      address: '2485 Augustine Road Santa Clara',
      isExpanded: false,
      employees: [
        {
          name: 'Lisa Su',
          phone: '(412)-829-2389',
          email: 'Lisa.Su@amd.com',
        },
        {
          name: 'Leo Jackson',
          phone: '(910)-829-6739',
          email: 'Leo.Jackson@amd.com',
        },
        {
          name: 'Eren Yeager',
          phone: '(921)-894-7831',
          email: 'Eren.Yeager@amd.com',
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
          name: 'Adam Trien',
          phone: '(437)-543-8925',
          email: 'Adam.Trien@insiten.com',
        },
        {
          name: 'Gentry Ganote',
          phone: '(784)-383-9812',
          email: 'Gentry.Ganote@insiten.com',
        },
        {
          name: 'Matt Osher',
          phone: '(734)-894-0912',
          email: 'Matt.Osher@insiten.com',
        },
        {
          name: 'Liz Meyers',
          phone: '(836)-745-7514',
          email: 'Liz.Myers@insiten.com',
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
          name: 'Jeff Bezos',
          phone: '(217)-327-8734',
          email: 'Jeff.Bezos@amazon.com',
        },
        {
          name: 'Andy Jassy',
          phone: '(321)-342-5436',
          email: 'Andy.Jassey@amazon.com',
        },
      ],
      status: 'Declined',
    },
  ];
  isTableExpanded = false;
  dataofCompanies = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  companyColumns: string[] = [
    'id',
    'name',
    'type',
    'address',
    'contacts',
    'status',
    ' ',
  ];

  ngOnInit() {
    this.dataofCompanies.data = this.COMPANIES_DATA;
    this.dataofCompanies.paginator = this.paginator;
  }
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataofCompanies.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }
  editItem(): void {}
  deleteItem(): void {}
}
