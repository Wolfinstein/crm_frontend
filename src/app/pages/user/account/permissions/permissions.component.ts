import {Component} from '@angular/core';

@Component({
  selector: 'permission-list',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})

export class PermissionsComponent {
  displayedColumns = ['permission', 'admin', 'manager', 'salesman'];
  dataSource = ELEMENT_DATA;

  constructor() {
  }
}

export interface Element {
  permission: string;
  admin: string;
  manager: string;
  salesman: string;
}

const ELEMENT_DATA: Element[] = [
  {permission: 'User Management', admin: 'full', manager: 'partial', salesman: 'none'},
  {permission: 'Client Management', admin: 'full', manager: 'full', salesman: 'partial'},
  {permission: 'Calendar Management', admin: 'full', manager: 'full', salesman: 'full'},
  {permission: 'Tbd', admin: 'none', manager: 'none', salesman: 'none'},
];
