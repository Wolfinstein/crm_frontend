import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ClientModel} from "../../models/client.model";
import {ApiRequestService} from "./api-request.service";
import {ActivityModel} from "../../models/activity.model";
import {AddressModel} from "../../models/address.model";
import {ContactModel} from "../../models/contact.model";
import {ContractorModel} from "../../models/contractor.model";
import {FormGroup} from "@angular/forms";
import {OrderModel} from "../../models/order.model";

@Injectable()
export class ClientService {


  constructor(private apiRequest: ApiRequestService ) { }

  addClient(client: FormGroup) {
    return this.apiRequest.post("client", client);
  }

  getAllClientPerTypes() : Observable <any> {
    return this.apiRequest.get('clients/pipeline');
  }

  getAllClientsNoFilter(): Observable<any> {
    return this.apiRequest.get('/clients/no-filter');
  }

  getAllClients(params): Observable<any> {
    return this.apiRequest.get('/clients', params);
  }

  getClient(id): Observable<any> {
    return this.apiRequest.get('client/' +id );
  }

  deleteClient(id): Observable<any> {
    return this.apiRequest.delete('client/delete/' + id);
  }

  editClient(id, client: ClientModel): Observable<any> {
    return this.apiRequest.put('client/edit/' + id, client)
  }

  addActivity(activity: ActivityModel, params) {
    return this.apiRequest.post("activity", activity, params);
  }


  getActivity(id): Observable<any> {
    return this.apiRequest.get('activity/client/' + id);
  }

  deleteActivity(id): Observable<any> {
  return this.apiRequest.delete('activity/' + id)};

  // address

  editAddress(form : AddressModel) : Observable <any> {
      return this.apiRequest.put('address/', form);
  }

  addAddress(address: AddressModel, id : number) {
    return this.apiRequest.post("address/add/" + id, address);
  }

  deleteAddress(id : number) : Observable <any> {
      return this.apiRequest.delete("address/"+ id);
  }

  // contact

  editContact(contact : ContactModel) : Observable <any> {
    return this.apiRequest.put('contact/', contact);
  }

  addContact(contact: ContactModel, id : number) : Observable <any> {
    return this.apiRequest.post("contact/add/" + id, contact);
  }

  deleteContact(id : number) : Observable <any> {
    return this.apiRequest.delete("contact/"+ id);
  }

  // contractor

  editContractor(contractor : ContractorModel) : Observable <any> {
    return this.apiRequest.put('contractor/', contractor);
  }

  addContractor(contractor: ContractorModel, id : number) : Observable <any> {
    return this.apiRequest.post("contractor/add/" + id, contractor);
  }

  deleteContractor(id : number) : Observable <any> {
    return this.apiRequest.delete("contractor/"+ id);
  }

  // document

  getDocuments(id): Observable<any> {
    return this.apiRequest.get('documents/client/' + id);
  }

  addDocument(document: FormData, id : number) : Observable <any> {
    return this.apiRequest.upload("documents/" + id, document);
  }

  deleteDocument(id : number) : Observable <any> {
    return this.apiRequest.delete("documents/"+ id);
  }

  downloadDocument(id : number) : Observable <any> {
    return this.apiRequest.download("documents/" +id);
  }

  // Import records from csv

  importClients(file: FormData) : Observable <any> {
    return this.apiRequest.upload("clients/upload/csv", file);
  }

  // Client Stats

  getClientsStats(year : number) : Observable <any> {
    return this.apiRequest.get('statistics/clients/' + year);
  }

  getClientsPercentage() : Observable <any> {
    return this.apiRequest.get('statistics/clients/percentage');
  }

  // Client Status

  updateStatus(id : number, status : string)
  {
    return this.apiRequest.put('update/status/' + id, status);
  }

  // Client Groups

  getAllGroups() : Observable <any>
  {
    return this.apiRequest.get('groups/all');
  }

  getAllClientsByGroupId(id : number) : Observable <any>
  {
    return this.apiRequest.get('groups/clients/' + id);
  }

  changeGroupMembers(id : number, clients : any[])
  {
    return this.apiRequest.post('groups/change/' + id, clients);
  }

  addGroup(name : string)
  {
    return this.apiRequest.post('groups/add', name);
  }


  editGroup(name : string, id: number)
  {
    return this.apiRequest.put('groups/edit/' + id, name);
  }

  deleteGroup(id : number)
  {
    return this.apiRequest.delete('groups/delete/' + id);
  }

  groupDropdown() : Observable<any>{
    return this.apiRequest.get('groups/dropdown');
  }

  getFilteredClientsByGroups(params) : Observable<any>{
    return this.apiRequest.get('groups/data', params );
  }

  //Client Orders

  editOrder(form : OrderModel) : Observable <any> {
    return this.apiRequest.put('order/', form);
  }

  getClientOrders(id : number) : Observable<any> {
    return this.apiRequest.get('order/client/' + id);
  }

  getOrder(id : number): Observable<any> {
    return this.apiRequest.get('order/' +id );
  }

  deleteOrder(id : number) {
    return this.apiRequest.delete('order/' + id);
  }

  addOrder(order: FormGroup, id : number){
    return this.apiRequest.post("order/" + id, order);

  }
}


