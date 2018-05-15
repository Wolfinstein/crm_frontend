import {Injectable} from '@angular/core';
import {ApiRequestService} from "./api-request.service";
import {Observable} from "rxjs/Observable";
import {UserForm} from "../../models/user-form.model";
import {FormGroup} from "@angular/forms";

@Injectable() @Injectable()
export class UserService {

  constructor(
    private apiRequest: ApiRequestService,
  ) {
  }


  getUsers(): Observable<any> {
    return this.apiRequest.get('users');
  }

  getUser(id: number): Observable<any> {
    return this.apiRequest.get('user/show/' + id)
  }

  addUser(user: FormGroup) {
    return this.apiRequest.post('users/add', user);
  }

  deleteUser(id: number): Observable<any> {
    return this.apiRequest.delete('users/' + id);
  }

  editUser(id: number, user: UserForm): Observable<any> {
    return this.apiRequest.put('users/' + id, user);
  }

  sendEmail(email: string): Observable<any> {
    return this.apiRequest.post('forgot-password', email);
  }

  resetPassword(form: FormGroup) {
    return this.apiRequest.post('reset-password', form);
  }

  getActivities(id: number): Observable<any> {
    return this.apiRequest.get('activity/user/' + id)
  }

  changePassword(password: string, id: number) {
    return this.apiRequest.post('user/change-password/' + id, password);
  }

  changeEmail(email: string, id: number) {
    return this.apiRequest.post('user/change-email/' + id, email);
  }

  sendAmaEmail(form: FormGroup) {
    return this.apiRequest.post('user/ama-email', form);
  }

}
