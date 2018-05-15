import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../services/api/user.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  token: string;
  errMsg: string;
  @Input() form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    this.form = fb.group({
      'token': [this.token],
      'password': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmPassword': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {validator: this.matchPassword})

  }

  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return {MatchPassword: true};
    } else {
      return null
    }
  }

  ngOnInit() {
  }

  resetPassword() {
    this.userService.resetPassword(this.form.value)
      .subscribe(user => {
          user = this.form.value;
          if (user.status == 200 || 201) {
            this.errMsg = "You have successfully changed your password !";
            this.router.navigate(['/home']);
          }
          else console.log(user.status)
        },
        error => {

          if (error.status === 406) {
            this.errMsg = "Your token is expired, you need to generate new one !"
          }
          else if (error.status === 404) {
            this.errMsg = "There is no such token in database !"
          }
          else {
            this.errMsg = "Unexpected error !"
          }
        });
  }


}
