import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserInfoService, LoginInfoInStorage} from '../../services/user-info.service';

@Component({
	selector   : 's-logout-pg',
	templateUrl: './logout.component.html',
})

export class LogoutComponent {
  constructor(private userInfoService: UserInfoService, private route: Router){
    this.userInfoService.removeUserInfo();
    this.route.navigate(['/home']);
  }
}
