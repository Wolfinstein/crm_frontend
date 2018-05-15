import {Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/api/user.service";
import {UserInfoService} from "../../../../services/user-info.service";

@Component({
  selector: 'password-change',
  templateUrl: './password.change.component.html',
  styleUrls: ['./password.change.component.scss'],
})
export class ChangePasswordComponent {

  errMsg: string = "";
  @Input() form: FormGroup;


  constructor(private userInfo: UserInfoService, private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
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

  sendPassword() {
    this.userService.changePassword(this.form.value.password, +this.route.snapshot.paramMap.get('id'))
      .subscribe(data => {
          this.errMsg = "You have successfully changed your password ! You will be redirected ...";
          setTimeout(() => {
              this.router.navigate(['user/' + this.userInfo.getUserInfo().displayName]);
            },
            1200);
        },
        error => {
          this.errMsg = "Unexpected error !"
        });
  }

}
