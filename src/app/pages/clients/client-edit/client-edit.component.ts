import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientModel} from "../../../models/client.model";
import {ClientService} from "../../../services/api/client.service";
import {ActivityService} from "../../../services/api/activity.service";
import {ActivityModel} from "../../../models/activity.model";
import {UserInfoService} from "../../../services/user-info.service";


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})

export class ClientEditComponent implements OnInit {

  id = this._route.snapshot.paramMap.get('id');
  currentClient: ClientModel;
  private sub: any;
  errMsg : string = "";

  constructor(private clientService: ClientService, private _route: ActivatedRoute,
              private _router: Router, private activityService : ActivityService, private userInfoService : UserInfoService) {
  }

  ngOnInit() {
    this.getClientDetails();
  }


  getClientDetails(){
    this.sub = this._route.params
      .map(params => params['id'])
      .switchMap(id => this.clientService.getClient(id))
      .subscribe((client: ClientModel) =>{
        this.currentClient = client;
      });
  }

  onClickEdit(id: number, client: ClientModel): void {
    this.clientService.editClient(id, client).subscribe((data) => {
      this.activityService.addActivity(new ActivityModel('Client edited by ' + this.userInfoService.getUserInfo().displayName , 'ClientEdited'), id);
      this._router.navigate(['/clients']);
    },
      error =>{
      if(error.status === 304)
      {
        this.errMsg = "You need to reload page because someone have edited this client !";
      }
      else if(error.status === 406)
      {
        this.errMsg = "Check given values, bear in mind that you must not give duplicate values !";
      }
      })
  }

  onBack(): void {
    this._router.navigate(['/clients']);
  }



}
