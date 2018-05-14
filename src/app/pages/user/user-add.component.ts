import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserAddComponent implements OnInit {

  @Input() userForm: FormGroup;
  errMsg:string;
  roles: string[] = ['SALESMAN', 'MANAGER', 'ADMIN'];

  constructor(fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userForm = fb.group({
      'name': ["", Validators.required],
      'surname': ["", Validators.required],
      'email': ["", Validators.compose([Validators.required, Validators.email])],
      'login': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      'role': ["SALESMAN"],
      'password': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      'passwordRepeated': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {validator: this.matchPassword})
  }

  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('passwordRepeated').value;
    if (password !== confirmPassword) {
      return {MatchPassword: true};
    } else {
      return null
    }
  }

  ngOnInit() {
  }

  createUser() {
    this.userService.addUser(this.userForm.value)
      .subscribe(user => {
          user = this.userForm.value;
          if (user.status == 200 || 201) {
            this.router.navigate(['/users']);
          }
        },
        error => {
           if (error.status == 409)
          {
            this.errMsg = "There is already user with this email."
          }

      });
  }


}
