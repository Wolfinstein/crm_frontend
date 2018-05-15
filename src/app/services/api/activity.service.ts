import {Injectable} from "@angular/core";
import {ActivityModel} from "../../models/activity.model";
import {HttpParams} from "@angular/common/http";
import {UserInfoService} from "../user-info.service";
import {ClientService} from "./client.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class ActivityService {

  constructor(private _route: ActivatedRoute, private _router: Router, private clientService: ClientService,
              private userInfoService: UserInfoService) {
  }

  addActivity(activityModel: ActivityModel, clientId: number) {
    let params = new HttpParams()
      .append('clientId', clientId.toString())
      .append('userId', this.userInfoService.getUserInfo().userId);

    this.clientService.addActivity(activityModel, params)
      .subscribe(data => {
        },
        error => {
          console.log(error);
        });
  }


}
