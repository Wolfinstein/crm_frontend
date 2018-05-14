import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';

import { LoginService   } from '../../services/api/login.service';
import { UserInfoService} from '../../services/user-info.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector   : 'home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent{
  @Input('isControls') public isControls: boolean = true;
    public selectedHeaderItemIndex:number=0;
    public selectedSubNavItemIndex:number=1;
    public userName: string="";
    route :string;

    constructor(
        private router:Router,
        private activeRoute:ActivatedRoute,
        private loginService:LoginService,
        private userInfoService:UserInfoService
    ) {


         this.router.events.subscribe((val) => {
        if(location.pathname != '')
        {
          this.route = location.pathname;
        }
        else
        {
          this.route = 'home'
        }
      });

        router.events
        .filter(event => event instanceof NavigationEnd)
        .map( _ => this.router.routerState.root)
        .map(route => {
            while (route.firstChild) route = route.firstChild;;
            return route;
        })
        .mergeMap( route => route.data)
        .subscribe(data => {
            this.selectedHeaderItemIndex = data[0]?data[0].selectedHeaderItemIndex:-1;
            this.selectedSubNavItemIndex = data[0]?data[0].selectedSubNavItemIndex:-1;
        });
        this.userName = this.userInfoService.getUserName();

    }




}
