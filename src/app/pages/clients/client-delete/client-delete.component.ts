import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../services/api/client.service";

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Array<any>;

  constructor(private clientService: ClientService, private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this.clientService.getClient(id).subscribe(data => {
      this.client = [data];
    })
  }

  onBack(): void {
    this._router.navigate(['/clients']);
  }

  onClickDelete(): void {
    let id = +this._route.snapshot.paramMap.get('id');
    this.clientService.deleteClient(id)
      .subscribe(data => {
        console.log("delete response stastus " + data.status);
        this.client = [data];
        if (data.status == "200") {
          this._router.navigate(['/clients']);
        }
      })
  }

}
