import {Component} from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  name: string = "";
  currentUrl: string = "";

  constructor(private userInfo: UserInfoService, private router: Router) {
    router.events.subscribe(data => {
      this.currentUrl = this.router.routerState.snapshot.url;
    });
  }

  handleUser() {
    if (this.IsLoggedIn()) {
      this.name = this.userInfo.getUserInfo().displayName.replace(' ', '_');
      this.router.navigate(['user/' + this.name]);
    }
  }


  IsLoggedIn(): boolean {
    return this.userInfo.isLoggedIn();
  };

  showUserLink(): boolean {
    if (this.IsLoggedIn()) {
      if (this.userInfo.getUserInfo().role != 'SALESMAN') {
        return true;
      }
    }
    else {
      return false;
    }
  }


}
