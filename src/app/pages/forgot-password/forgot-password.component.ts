import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/api/user.service";

@Component({
  selector   : 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  model: any = {};
  errMsg:string = '';


  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  sendEmail() {
      this.userService.sendEmail(this.model.email)
      .subscribe(resp => {
        this.errMsg = "Check your email inbox."
      },
        error =>{
          if(error.status === 404 || error.status === 400)
          {
            this.errMsg = 'Email not found.';
          }
        }
        );
  }




}
