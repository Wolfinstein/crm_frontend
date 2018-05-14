import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/api/user.service";
import {UserForm} from "../../../models/user-form.model";
import {UserInfoService} from "../../../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'user-account',
  templateUrl: './user.account.component.html',
  styleUrls: ['./user.account.component.scss'],
})
export class UserAccountComponent implements OnInit {

  user  : any;
  constructor(private userInfoService : UserInfoService, private userService : UserService, private router: Router){
  }

  ngOnInit()
  {
    this.user =  this.userInfoService.getUserInfo();
  }

  accountDetails(){
    this.router.navigate(['users/' + this.user.userId]);
  }

  appearanceChange()
  {
    this.router.navigate(['theme']);
  }

  passwordChange()
  {
    this.router.navigate(['user/change-password/' + this.user.userId]);
  }

  emailChange()
  {
    this.router.navigate(['user/change-email/' + this.user.userId]);
  }

  showPermissions()
  {
    this.router.navigate(['permissions']);
  }

  amaQuestion()
  {
    this.router.navigate(['ama-email']);
  }

  showStatistics()
  {
    this.router.navigate(['statistics']);

  }

}
