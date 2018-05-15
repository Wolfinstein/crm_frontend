import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../../services/api/client.service";
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from "@angular/common/http";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {UserInfoService} from "../../../services/user-info.service";
import {IMultiSelectOption, IMultiSelectSettings} from "angular-2-dropdown-multiselect";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  filterShow: boolean = false;
  clientTypeModel: String;
  emailModel: String;
  phoneModel: String;
  nipModel: String;
  peselModel: String;
  nameModel: String;
  types: String[] = ['All Clients', 'Individual', 'Company'];
  filterTableRows: any[] = [];
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };
  @ViewChild(DatatableComponent) private table: DatatableComponent;

  constructor(private route: ActivatedRoute, private _router: Router, private clientService: ClientService, private userInfo: UserInfoService) {
    this.clientTypeModel = "All Clients";
    this.emailModel = "";
    this.phoneModel = "";
    this.nipModel = "";
    this.peselModel = "";
    this.nameModel = "";
    this.fillDropdown()
  }

  ngOnInit() {
    this.getClients(this.clientTypeModel, this.emailModel, this.phoneModel, this.nipModel, this.peselModel, this.nameModel);
  }

  getClients(client_type, email, phone, nip, pesel, name) {
    let params = new HttpParams()
      .append('client_type', client_type)
      .append('Email', email)
      .append('Phone', phone)
      .append('Nip', nip)
      .append('PESEL', pesel)
      .append('Name', name);
    this.clientService.getAllClients(params)
      .subscribe(data => {
        this.filterTableRows = data;
        if (this.filterTableRows == null) {
          if (confirm("No client with this value")) {
            this.getClients('', '', '', '', '', '');
          }
        }
      });
  }

  onLimitChange(limit: any): void {
    this.table.limit = parseInt(limit, 10);
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        this.table.offset = 0;
      }
    });
  }

  showDeleteButton(): boolean {
    if (this.userInfo.isLoggedIn()) {
      if (this.userInfo.getUserInfo().role != 'SALESMAN') {
        return true;
      }
    }
    else {
      return false;
    }
  }

  fillDropdown() {
    this.clientService.groupDropdown().subscribe(data => this.myOptions = data)
  }

  onChange(event) {
    let params = new HttpParams()
      .append('listOfGroupId', event.join(','));
    this.clientService.getFilteredClientsByGroups(params).subscribe(data => {
        this.filterTableRows = data
      },
      error => console.log(error.status)
    );
  }

  changeFilter() {
    this.filterShow = !this.filterShow;
    this.getClients(this.clientTypeModel, this.emailModel, this.phoneModel, this.nipModel, this.peselModel, this.nameModel);
    this.optionsModel = [];

  }

}
