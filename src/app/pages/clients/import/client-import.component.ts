import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ClientService} from "../../../services/api/client.service";

@Component({
  selector: 'client-import',
  templateUrl: './client-import.component.html',
  styleUrls: ['./client-import.component.scss']
})
export class ClientImportComponent implements OnInit {

  errMsg: string = "";
  files: FileList = null;

  constructor(private clientService: ClientService, private  router: Router) {
  }

  ngOnInit() {
  }

  importFromCSV() {
    if (this.files != null) {
      let file: File = this.files[0];

      if (file.size > 104857600) {
        this.errMsg = "File must not be bigger than 100mb"
      }
      else {
        let formData: FormData = new FormData();
        formData.append('file', file);
        this.clientService.importClients(formData)
          .subscribe(
            data => {
              if (data > 0) {
                this.errMsg = "You have added " + data + " client/s, you will be redirected !";
                setTimeout(() => {
                    this.router.navigate(['/clients']);
                  },
                  3000);
              }
              else {
                this.errMsg = "You have not added any clients !";
              }
            },
            error => {
              this.errMsg = "An unexpected error occurred, contact with Admin !";
            })
      }
    }
    else {
      this.errMsg = "You must choose CSV File first !"
    }
  }

  getFiles(event) {
    this.files = event.target.files;
  }

}
