import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../services/api/client.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  activity: any;

  constructor(private clientService: ClientService, private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this.clientService.getActivity(id).subscribe( data => {
      this.activity = [data];
    })
  }

  onBack(): void {
    this._router.navigate(['/clients']);
  }

}
