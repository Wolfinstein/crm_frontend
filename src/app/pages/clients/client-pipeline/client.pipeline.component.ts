import {Component, Input, OnDestroy} from '@angular/core';
import {DragulaService} from "ng2-dragula";
import {ClientService} from "../../../services/api/client.service";
import {ActivityModel} from "../../../models/activity.model";
import {ActivityService} from "../../../services/api/activity.service";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'client-pipeline',
  templateUrl: './client.pipeline.component.html',
  styleUrls: ['./client.pipeline.component.scss']
})
export class ClientPipelineComponent implements OnDestroy {

  @Input('term') term: string;

  clients_NewLead: any[] = [];
  clients_ContactMode: any[] = [];
  clients_Qualified: any[] = [];
  clients_InNegotiations: any[] = [];
  clients_Closed: any[] = [];
  amount_list: any[] = [];
  tempList: any[] = [];

  statusTypes = ['NewLead', 'ContactMade', 'Qualified', 'InNegotiation', 'Closed'];

  constructor(private clientService: ClientService, private dragulaService: DragulaService, private activityService: ActivityService, private userInfoService: UserInfoService) {
    this.fillLists();
    dragulaService.setOptions('first-bag', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });

    dragulaService.dropModel.subscribe((value: any[]) => {
      this.tempList = this.amount_list;
      let id = this.onDropModel(value.slice(1));
      this.fillAmountsList();
      let statusNumber = this.checkLengthChange(this.amount_list, this.tempList);

      if (statusNumber[0] != statusNumber[1]) {
        this.clientService.updateStatus(id, this.statusTypes[statusNumber[1]]).subscribe();
        this.activityService.addActivity(new ActivityModel('Status changed' + this.userInfoService.getUserInfo().displayName, 'StatusChanged'), id);
        this.term = "";
        setTimeout(() => {
            this.fillLists();
          },
          200);
      }
    });
    dragulaService.removeModel.subscribe((value: any[]) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  sort(prop: string, array: any) {
    return array.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  checkLengthChange(newList: any[], tmpList: any[]): any {
    let outList: Array<number> = [0, 0];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i] != tmpList[i]) {
        if (newList[i] < tmpList[i]) {
          outList[0] = i;
        }
        else {
          outList[1] = i;
        }
      }
    }
    return outList;
  }

  fillAmountsList() {
    this.amount_list =
      [
        this.clients_NewLead.length,
        this.clients_ContactMode.length,
        this.clients_Qualified.length,
        this.clients_InNegotiations.length,
        this.clients_Closed.length
      ]
  }

  fillLists() {
    this.clientService.getAllClientPerTypes()
      .subscribe(data => {
        this.clients_NewLead = data[0];
        this.clients_ContactMode = data[1];
        this.clients_Qualified = data[2];
        this.clients_InNegotiations = data[3];
        this.clients_Closed = data[4];
        this.fillAmountsList();
      });
  }

  ngOnDestroy() {
    this.dragulaService.destroy("first-bag");
  }

  private onDropModel(args: any): number {
    let [el, target, source] = args;

    return el.innerText.substring(el.innerText.indexOf('!') + 1, el.innerText.indexOf('$'))
  }

  private onRemoveModel(args: any): void {
    let [el, source] = args;
  }


}
