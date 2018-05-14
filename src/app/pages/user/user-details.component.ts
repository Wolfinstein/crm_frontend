import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/api/user.service";
import {UserForm} from "../../models/user-form.model";

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit,OnDestroy {
  user: any;
  activities : any[] = [];
  private sub: any;
  id = +this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute, private router: Router,  private userService: UserService) {
  }

  ngOnInit()
  {
    this.getActivities();
    this.getDetails();
  }

  getDetails(){
    this.sub = this.userService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
      });
  }

  getActivities(){
    this.sub = this.userService.getActivities(this.id)
      .subscribe(data => {
        this.activities = data;
      },error => {
        if(error.status === 404){
          console.log('No activities');
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
