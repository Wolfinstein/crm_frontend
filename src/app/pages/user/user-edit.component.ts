import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../../services/api/user.service';
import {UserForm} from "../../models/user-form.model";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  id: number;
  currentUser: UserForm;
  roles : string[] = ['ADMIN', 'MANAGER', 'SALESMAN'];
  errMsg : string;
  private sub: any;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.getDetails();
  }

  editUser(id : number, user : UserForm) {
      this.userService.editUser(id, user).subscribe((data) => {
        this.router.navigate(['/users']);
      },
      error =>
      {
          if(error.status === 409)
          {
            this.errMsg = "This email is already used."
          }
      });
  }

  getDetails(){
    this.sub = this.route.params
      .map(params => params['id'])
      .switchMap(id => this.userService.getUser(id))
      .subscribe((user: UserForm) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
