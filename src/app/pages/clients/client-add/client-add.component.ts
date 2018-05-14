import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClientService} from "../../../services/api/client.service";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  @Input() clientModel: FormGroup;
  client_types : string[] = ['', 'Individual', 'Company'];

  constructor(private _router: Router, private clientService: ClientService,
              formBuilder: FormBuilder) {
    this.clientModel = formBuilder.group( {
      'client_type': [" "],
      'email': ["", Validators.compose([Validators.required, Validators.email])],
      'phone': ["", Validators.compose([Validators.required, Validators.minLength(9)])],
      'nip': ["", Validators.compose([Validators.required, Validators.minLength(10)])],
      'pesel': ["", Validators.compose([Validators.required, Validators.minLength(11)])],
      'regon': ["", Validators.compose([Validators.required, Validators.minLength(9)])],
      'description': [""],
      'firstName': [""],
      'lastName': [""],
      'name': [""],
      'trade': [""],
      'type': [""],
      'website': [""]
    })
  }

  ngOnInit() {
  }

  createClient() {
    this.clientService.addClient(this.clientModel.value).subscribe(client => {
      client = this.clientModel.value;
      console.log("client: " + client);
        this._router.navigate(['/clients']);
    });

  }

}
