import {Component, HostBinding, OnInit} from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'side-nav-component',
  styleUrls: ['./side-nav.component.scss'],
  templateUrl: './side-nav.component.html',
})

export class SideNavComponent implements OnInit {
  sidenavWidth = 4;
  route : string;
  clients : any[]= [];
  showUsers: boolean = true;
  showClients: boolean = true;
  showProducts: boolean = true;

  constructor(private userInfo: UserInfoService, private location: Location, private router:Router, public overlayContainer: OverlayContainer){
  }

  ngOnInit() {
    this.sidenavWidth = 4;

    this.router.events.subscribe((val) => {
      if(location.pathname != '')
      {
        this.route = location.pathname;
      }
      else
      {
        this.route = 'home'
      }
    })

  }

  increase () {
    this.sidenavWidth = 14;
  }

  decrease () {
    this.sidenavWidth = 4;
  }

  IsLoggedIn(): boolean {
    return this.userInfo.isLoggedIn();
  };


  defaultTheme : string = 'default-theme';
  darkTheme : string = 'dark-theme';
  currentTheme = this.defaultTheme;

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  toDark()
  {
    this.currentTheme = this.darkTheme;
    this.onSetTheme(this.currentTheme);
  }

  toLight()
  {
    this.currentTheme = this.defaultTheme;
    this.onSetTheme(this.currentTheme);
  }

  isInThemeChange() :boolean
  {
    if(this.IsLoggedIn())
    {
      return this.route === '/theme';
    }
  }


  showUsersOptions(){
    this.showUsers = !this.showUsers;
  }

  showClientsOptions(){
    this.showClients = !this.showClients;
  }

  showProductsOptions(){
    this.showProducts = !this.showProducts;
  }

  showUserLink(): boolean {
      return this.userInfo.getUserInfo().role != 'SALESMAN';
  }

}
