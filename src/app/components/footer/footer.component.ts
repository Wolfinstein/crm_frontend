import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'footer-component',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit {

  route : string;
  constructor(private location: Location, private router:Router){
  }

  ngOnInit() {
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

}
