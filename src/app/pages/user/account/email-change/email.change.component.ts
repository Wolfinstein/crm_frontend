import {Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/api/user.service";
import {UserInfoService} from "../../../../services/user-info.service";

@Component({
  selector: 'email-change',
  templateUrl: './email.change.component.html',
  styleUrls: ['./email.change.component.scss'],
})
export class ChangeEmailComponent {

  errMsg: string = "";
  @Input() form: FormGroup;


  constructor(private userInfo: UserInfoService, private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      'email': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmEmail': ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {validator: this.matchEmail})
  }


  matchEmail(AC: AbstractControl) {
    const email = AC.get('email').value;
    const confirmEmail = AC.get('confirmEmail').value;
    if (email !== confirmEmail) {
      return {MatchEmail: true};
    } else {
      return null
    }
  }


  sendEmail() {
    this.userService.changeEmail(this.form.value.email, +this.route.snapshot.paramMap.get('id'))
      .subscribe(data => {
          this.errMsg = "You have successfully changed your email ! You will be redirected ...";
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
