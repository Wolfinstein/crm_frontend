import {Component, Inject, ViewChild} from '@angular/core';
import {ClientService} from "../../../services/api/client.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'groups-list',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {

  groups: any[];
  rows = [];
  clientsInGroup: any[];
  selected = [];
  temp = [];
  groupId: number;
  groupName: string = 'Choose Group';
  errMsg: string;
  name: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private clientService: ClientService, public dialog: MatDialog, private router: Router) {
    this.getGroups();
  }

  getGroups() {
    this.clientService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  showGroupMembers(id: number, name: string) {
    this.groupId = id;
    this.groupName = name;
    this.selected = [];
    this.rows = [];

    this.clientService.getAllClientsNoFilter().subscribe(data => {
      this.temp = [...data];
      this.rows = data;

      for (let entry of this.clientsInGroup) {
        this.selected.push(data[entry - 1])
      }

    });
    this.clientService.getAllClientsByGroupId(id).subscribe(data => {
      this.clientsInGroup = data;
    });
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val + d.lastName.toLowerCase().indexOf(val) !== -1 || !val + d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  changeGroupMembers(id: number, clients: any[]) {
    if (confirm("Are you sure about changing group members ?")) {
      this.clientService.changeGroupMembers(id, clients).subscribe(data => {
      }, error => {
        console.log(error.status);
      })
    }
  }

  toClient(id: number) {
    if (confirm("You will lose your current selection, are u sure about leaving this page ?")) {
      this.router.navigate(['/client/' + id]);
    }
  }

  newGroup(): void {
    let dialogRef = this.dialog.open(NewGroupDialog, {
      width: '250px',
      data: {name: this.name, errMsg: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if (this.name.length < 3) {
        this.name = 'no';
        this.errMsg = 'This name is shorter than 3 characters !';
        setTimeout(() => {
            this.errMsg = '';
          },
          4000);
      }
      else {
        this.clientService.addGroup(this.name).subscribe(data => {
            this.getGroups();
          },
          error => {
            this.errMsg = 'This name is already taken  !';
            setTimeout(() => {
                this.errMsg = '';
              },
              4000);
          });
      }
    });
  }

  editGroup(): void {
    let dialogRef = this.dialog.open(EditGroupDialog, {
      width: '250px',
      data: {name: this.name, errMsg: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if (this.name.length < 3) {
        this.name = 'no';
        this.errMsg = 'This name is shorter than 3 characters !';
        setTimeout(() => {
            this.errMsg = '';
          },
          4000);
      }
      else {
        this.clientService.editGroup(this.name, this.groupId).subscribe(data => {
            this.getGroups();
          },
          error => {
            this.errMsg = 'This name is already taken  !';
            setTimeout(() => {
                this.errMsg = '';
              },
              4000);
          });
      }
    });
  }

  deleteGroup(id: number) {
    if (confirm("Are you really want to delete this group ?")) {
      this.clientService.deleteGroup(id).subscribe(data => this.getGroups(),
        error => console.log(error.status));
    }
  }
}

@Component({
  selector: 'new-group-dialog',
  templateUrl: './new-group-dialog.html'
})
export class NewGroupDialog {

  constructor(public dialogRef: MatDialogRef<NewGroupDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'edit-group-dialog',
  templateUrl: './edit-group-dialog.html'
})
export class EditGroupDialog {

  constructor(public dialogRef: MatDialogRef<EditGroupDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
