import {Component} from "@angular/core";
import {ClientService} from "../../../../services/api/client.service";
import { colorSets } from '../../../../models/utils/color-sets';

@Component({
  selector: 'user-stats',
  templateUrl: './user.statistics.component.html',
  styleUrls: ['./user.statistics.component.scss'],
})
export class UserStatisticsComponent {

   aqua : any;
   cool : any;

   clientStats2017 : any;
   clientStats2018 : any;
   clientsPercentage : any;

  constructor(private clientService: ClientService) {
    this.clientService.getClientsStats(2017).subscribe(data => this.clientStats2017 = data);
    this.clientService.getClientsStats(2018).subscribe(data => this.clientStats2018 = data);
    this.clientService.getClientsPercentage().subscribe(data => this.clientsPercentage = data);
    this.aqua =  colorSets.find(s => s.name === 'aqua');
    this.cool =  colorSets.find(s => s.name === 'cool');

  }


  onSelect(event) {
  }

}
