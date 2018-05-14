import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../../services/api/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressModel} from "../../../models/address.model";
import {ContactModel} from "../../../models/contact.model";
import {ContractorModel} from "../../../models/contractor.model";
import {DocumentModel} from "../../../models/document.model";
import {saveAs} from "file-saver";
import {ActivityModel} from "../../../models/activity.model";
import {UserInfoService} from "../../../services/user-info.service";
import {ActivityService} from "../../../services/api/activity.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Array<any>;
  client_activities : any[] = [];
  client_addresses: any[] = [];
  client_contacts: any[] =[];
  client_contractors: any[] =[];
  client_documents: any[] = [];
  client_orders: any[] = [];
  editing = {};
  errMsg : string = "";
  tempString : string;
  sub_tables :boolean = false;
  temp : any[]  =[];
  id = +this._route.snapshot.paramMap.get('id');

  @ViewChild(DatatableComponent) activity_table: DatatableComponent;

  constructor(private clientService: ClientService, private _route: ActivatedRoute,
              private userInfoService : UserInfoService, private activityService :ActivityService,
              private userInfo : UserInfoService) {
    this.getActivities();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    this.client_activities = this.temp.filter(function (d) {
      return d.type_activity.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.activity_table.offset = 0;
  }


  showHide(bool : boolean){
    this.sub_tables = bool != false;
  }

  showButton(): boolean {
    if(this.userInfo.isLoggedIn())
    {
      if (this.userInfo.getUserInfo().role != 'SALESMAN')
      {
        return true;
      }
    }
    else
    {
      return false;
    }
  }



  ngOnInit() {
    this.getClients();
    this.getActivities();
    this.getDocuments();
    this.getOrders();
  }

  getClients(){
    this.clientService.getClient(this.id).subscribe(data => {
      this.client = [data];
      this.client_addresses = data.addresses;
      this.client_contacts = data.contacts;
      this.client_contractors = data.contractors;
      let dateTime = data.createTimeStamp;
      data.createTimeStamp = new Date(parseInt(dateTime, 10));
    })
  }

  getActivities(){
     this._route.params
      .map(params => params['id'])
      .switchMap(id => this.clientService.getActivity(id))
      .subscribe(data => {
        this.temp = [...data];
        this.client_activities = data;
      },error => {
        if(error.status === 404){
          console.log('No activities');
        }
      })
  }

  updateOrder(event, cell, rowIndex) {
    this.errMsg = "";
    this.editing[rowIndex + '-' + cell] = false;
    let form = this.client_orders[rowIndex];
    this.tempString = this.client_orders[rowIndex][cell];
    this.client_orders[rowIndex][cell] = event.target.value;

    this.clientService.editOrder(form).subscribe(data => {
      },
      error =>{
        if(error.status === 400)
        {
          this.errMsg = "Error occurred, you must pick one of those order status (Realized, InProgress, Unrealized, Canceled)";
        }
        this.client_orders[rowIndex][cell] = this.tempString;
      });

    if(this.client_orders[rowIndex][cell] != this.tempString)
    {
      this.activityService.addActivity(new ActivityModel('Order status edited by ' + this.userInfoService.getUserInfo().displayName , 'EditedOrder'),this.id);
    }

    this.client_orders = [...this.client_orders];

  }


  getOrders(){
    this._route.params
      .map(params => params['id'])
      .switchMap(id => this.clientService.getClientOrders(id))
      .subscribe(data => {
        this.temp = [...data];
        this.client_orders = data;
      },error => {
        if(error.status === 404){
          console.log('No orders');
        }
      })
  }

  deleteOrders(id: number){
    if(confirm("Are you sure about deleting this order ?")) {
      this.clientService.addActivity(new ActivityModel('Order has been deleted by ' + this.userInfoService.getUserInfo().displayName, 'DeletedOrder'), this.id);
      this.clientService.deleteOrder(id).subscribe((data) => {
          if (data.status == 200 || data.status == 204) {
            this.getOrders();
          }
        }
      );
    }
  }

  getDocuments(){
    this._route.params
      .map(params => params['id'])
      .switchMap(id => this.clientService.getDocuments(id))
      .subscribe(data => {
        this.client_documents = data;
      },error => {
        if(error.status === 404){
          console.log('No documents');
        }
      })

  }

  // Address

  updateAddress(event, cell, rowIndex) {
    this.errMsg = "";
    this.editing[rowIndex + '-' + cell] = false;
    let form = this.client_addresses[rowIndex];
    this.tempString = this.client_addresses[rowIndex][cell];
    this.client_addresses[rowIndex][cell] = event.target.value;

    this.clientService.editAddress(form).subscribe(data => {
      },
      error =>{
        if(error.status === 409)
        {
          this.errMsg = "Error occurred, there must not be more than one HOME address";
        }
        else if(error.status === 400)
        {
          this.errMsg = "Error occurred, you must pick one of those address types (HOME, BUSINESS, DELIVERY, BILLING)";
        }
        this.client_addresses[rowIndex][cell] = this.tempString;
      });

    if(this.client_addresses[rowIndex][cell] != this.tempString)
    {
      this.activityService.addActivity(new ActivityModel(form.addressType + '  address edited by ' + this.userInfoService.getUserInfo().displayName , 'EditedAddress'),this.id);
    }

    this.client_addresses = [...this.client_addresses];

  }

  addAddress(){
    let client_id = +this._route.snapshot.paramMap.get('id');

    let address : AddressModel = {
      addressType: "BUSINESS",
      city: "new",
      country: "new",
      houseNumber: "new",
      state: "new",
      street: "new",
      zipCode: "new",
      clientId : client_id.toString()
    };

    this.clientService.addAddress(address, client_id).subscribe(data =>{
      this.getClients();
    });
    this.activityService.addActivity(new ActivityModel('New address has been added by ' + this.userInfoService.getUserInfo().displayName , 'AddedAddress'),this.id);
  }

  deleteAddress(id: number){
    if(confirm("Are you sure about deleting this address ?")) {
      this.activityService.addActivity(new ActivityModel('Address has been deleted by ' + this.userInfoService.getUserInfo().displayName, 'DeletedAddress'), this.id);
      this.clientService.deleteAddress(id).subscribe((data) => {
          if (data.status == 200 || data.status == 204) {
            this.getClients();
          }
        }
      );
    }
  }

  // Contact

  updateContact(event, cell, rowIndex) {
    this.errMsg = "";
    this.editing[rowIndex + '-' + cell] = false;
    let form = this.client_contacts[rowIndex];
    this.tempString = this.client_contacts[rowIndex][cell];
    this.client_contacts[rowIndex][cell] = event.target.value;

    this.clientService.editContact(form).subscribe(data => {
      },
      error =>{
        if(error.status === 409)
        {
          console.log(error.status);
          this.errMsg = "Error occurred";
        }
        else if(error.status === 400)
        {
          console.log(error.status);
          this.errMsg = "Error occurred";
        }
        this.client_contacts[rowIndex][cell] = this.tempString;
      });

    if(this.client_contacts[rowIndex][cell] != this.tempString)
    {
      this.activityService.addActivity(new ActivityModel('Contact ' + form.name + ' ' + form.surname + ' has been edited by ' + this.userInfoService.getUserInfo().displayName , 'EditedContact'),this.id);
    }


    this.client_contacts = [...this.client_contacts];

  }

  addContact(){
    let client_id = +this._route.snapshot.paramMap.get('id');

    let contact : ContactModel = {
      name: "new",
      surname: "new",
      email : "example@example.com",
      position: "new",
      phone : "123-123-123",
      description : "new",
      clientId : client_id.toString()
    };

    this.clientService.addContact(contact, client_id).subscribe(data =>{
      this.getClients();
    });
    this.activityService.addActivity(new ActivityModel('New contact has been added by ' + this.userInfoService.getUserInfo().displayName , 'AddedContact'),this.id);

  }

  deleteContact(id: number){
    if(confirm("Are you sure about deleting this contact ?")) {
      this.activityService.addActivity(new ActivityModel('Contact has been deleted by ' + this.userInfoService.getUserInfo().displayName , 'DeletedContact'),this.id);
      this.clientService.deleteContact(id).subscribe((data) => {
          if (data.status == 200 || data.status == 204) {
            this.getClients();
          }
        }
      );
    }
    }

  // Contractor

  updateContractor(event, cell, rowIndex) {
    this.errMsg = "";
    this.editing[rowIndex + '-' + cell] = false;
    let form = this.client_contractors[rowIndex];
    this.tempString = this.client_contractors[rowIndex][cell];
    this.client_contractors[rowIndex][cell] = event.target.value;

    this.clientService.editContractor(form).subscribe(data => {
      },
      error =>{
        if(error.status === 409)
        {
          console.log(error.status);
          this.errMsg = "Error occurred";
        }
        else if(error.status === 400)
        {
          console.log(error.status);
          this.errMsg = "Error occurred";
        }
        this.client_contractors[rowIndex][cell] = this.tempString;
      });

    if(this.client_contractors[rowIndex][cell] != this.tempString)
    {
      this.activityService.addActivity(new ActivityModel('Contractor ' + form.name + ' has been edited by ' + this.userInfoService.getUserInfo().displayName , 'EditedContractor'),this.id);
    }

    this.client_contractors = [...this.client_contractors];

  }

  addContractor(){
    let client_id = +this._route.snapshot.paramMap.get('id');

    let contractor : ContractorModel = {
      name: "new",
      description : "new",
      clientId : client_id.toString()
    };

    this.clientService.addContractor(contractor, client_id).subscribe(data =>{
      this.getClients();
    });
    this.activityService.addActivity(new ActivityModel('New contractor has been added by ' + this.userInfoService.getUserInfo().displayName , 'AddedContractor'),this.id);

  }

  deleteContractor(id: number){
    if(confirm("Are you sure about deleting this contractor ?")) {
      this.activityService.addActivity(new ActivityModel('Contractor has been deleted by ' + this.userInfoService.getUserInfo().displayName , 'DeletedContractor'),this.id);
      this.clientService.deleteContractor(id).subscribe((data) => {
          if (data.status == 200 || data.status == 204) {
            this.getClients();
          }
        }
      );
    }
  }

  // Document

  deleteFile(id: number){
    if(confirm("Are you sure about deleting this document ?"))
    {
      this.activityService.addActivity(new ActivityModel('File has been deleted by ' + this.userInfoService.getUserInfo().displayName , 'DeletedFile'),this.id);

      this.clientService.deleteDocument(id).subscribe((data) => {
          if (data.status == 200 || data.status == 204) {
            this.getDocuments();
          }
        }
      );
    }
    }

  uploadFile(event){
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      if(file.size > 104857600)
      {
        this.errMsg = "File must not be bigger than 100mb"
      }
      else
      {
        let formData: FormData = new FormData();
        formData.append('file', file);
        this.clientService.addDocument(formData, this.id)
          .subscribe(
            data => {
              this.getDocuments();
            },
            error => console.log(error)
          )
      }
    }
    this.activityService.addActivity(new ActivityModel('File ' + fileList.item(0).name + ' has been uploaded by ' + this.userInfoService.getUserInfo().displayName , 'UploadedFile'),this.id);
  }

  downloadFile(id : number, fileName : string)
  {
    this.clientService.downloadDocument(id).subscribe(data => saveAs(data,fileName.split("\\.", 2)[0]));
  }


}
