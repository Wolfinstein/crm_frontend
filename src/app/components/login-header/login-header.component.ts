import {Component, OnDestroy, OnInit} from '@angular/core';
import { LoginService } from '../../services/api/login.service';
import { Router } from '@angular/router';
import {Subscription} from "rxjs/Subscription";

@Component({
	selector   : 's-login-pg',
	templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})

export class LoginHeaderComponent implements OnInit {
    model: any = {};
    errMsg:string = '';
    sub : any;
  constructor(
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit() : void {
        this.loginService.logout(false);
    }

    login() {
    this.sub =
             this.loginService.getToken(this.model.username, this.model.password)
            .subscribe(resp => {

              if(resp.message === 'failure')
              {
                this.errMsg = 'Given credentials are not correct.';
                this.router.navigate(['/login']);
              }
              else if(resp.message === 'server_failure')
              {
                this.errMsg = 'Server error occurred.';
              }
              else
              {
                setTimeout(() =>
                  {
                    this.router.navigate(['/dashboard']);
                  },
                  700);
              }

              }
            );
    }

}
