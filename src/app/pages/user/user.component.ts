import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../../services/api/user.service';
import {UserForm} from "../../models/user-form.model";
import {Component, OnInit, ViewChild} from "@angular/core";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'user-list',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  rows : any[]  =[];
  temp : any[]  =[];
  editing = {};
  form : UserForm;
  errMsg : string = "";
  tempString : string ;
  @ViewChild(DatatableComponent) private table: DatatableComponent;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private userInfo: UserInfoService) {
    this.getUsers();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    this.rows = this.temp.filter(function (d) {
      return d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }


  updateValue(event, cell, rowIndex) {
    this.errMsg = "";
    this.editing[rowIndex + '-' + cell] = false;

    if(this.isAdmin()) {

      this.form = this.rows[rowIndex];
      this.tempString = this.rows[rowIndex][cell];
      this.rows[rowIndex][cell] = event.target.value;

      this.userService.editUser(this.form.id, this.form).subscribe(data => {
        },
        error => {
          if (error.status === 409) {
            console.log(error.status);
            this.errMsg = "Error occurred, you are probably trying to insert not unique values to database.";
          }
          else if (error.status === 400) {
            console.log(error.status);
            this.errMsg = "Error occurred, you must pick one of those 3 roles (MANAGER, ADMIN, SALESMAN)";
          }
          this.rows[rowIndex][cell] = this.tempString;
        });

      this.rows = [...this.rows];
    }
  }


  ngOnInit() {
    this.getUsers()
  }


  deleteUser(id:number) {
    if(confirm("Are you sure about deleting user with id: "+id ))
    this.userService.deleteUser(id).subscribe((data) => {
      console.log("delete response status " + data.status);
      if (data.status == 200 || data.status == 204)
      {
        this.getUsers();
      }
      }
    );
  }
  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.temp = [...data];
        this.rows = data;
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

  isAdmin(): boolean {
      if (this.userInfo.getUserInfo().role === 'ADMIN')
      {
        return true;
      }
  }


}
