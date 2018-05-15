import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../../services/api/calendar.service";
import {EventModel} from "../../../models/event.model";

@Component({
  selector: 'app-calendar-edit-event',
  templateUrl: './calendar-edit-event.component.html',
  styleUrls: ['./calendar-edit-event.component.css']
})
export class CalendarEditEventComponent implements OnInit {


  currentEvent: EventModel;
  id = this._route.snapshot.paramMap.get('id');
  colors: string[] = ["Select status", "green", "red", "yellow", "blue"];

  constructor(private _route: ActivatedRoute, private calendarService: CalendarService,
              private _router: Router,) {
  }

  ngOnInit() {

    this.getEventDetails(this.id);
    console.log("Event: " + this.currentEvent);
  }


  getEventDetails(id) {
    this.calendarService.getEvent(id)
      .subscribe((event: EventModel) => {
        this.currentEvent = event;
      });
  }

  onClickEdit(id: number, event: EventModel): void {
    this.calendarService.editEvent(id, event).subscribe((data) => {
      this._router.navigate(['/calendar']);
    })
  }
}
