import {Component, Input} from "@angular/core";
import {UserService} from "../../../../services/api/user.service";
import {UserInfoService} from "../../../../services/user-info.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'ama-email',
  templateUrl: './ama-email.component.html',
  styleUrls: ['./ama-email.component.scss'],
})
export class AmaEmailComponent {

  errMsg: string = "";
  @Input() htmlForm: FormGroup;


  constructor(private userInfo: UserInfoService, private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.htmlForm = fb.group({
      'subject': ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
      'message': ["", Validators.compose([Validators.required, Validators.maxLength(300)])],
      'name': [this.userInfo.getUserInfo().displayName],
      'email': [this.userInfo.getUserInfo().email]
    })
  }

  sendQuestion() {
    this.userService.sendAmaEmail(this.htmlForm.value)
      .subscribe(data => {
          this.errMsg = "You have successfully sent your email !";
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
