import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CalendarService} from "../../../services/api/calendar.service";
import {UserInfoService} from "../../../services/user-info.service";

@Component({
  selector: 'app-calendar-add-event',
  templateUrl: './calendar-add-event.component.html',
  styleUrls: ['./calendar-add-event.component.css']
})
export class CalendarAddEventComponent implements OnInit {

  @Input() eventModel: FormGroup;
  colors: string[] = ["Select status", "green", "red", "yellow", "blue"];

  constructor(private _router: Router, private calendarService: CalendarService,
              formBuilder: FormBuilder, private userInfoService: UserInfoService) {
    this.eventModel = formBuilder.group({
      'start': [""],
      'end': [""],
      'title': ["", Validators.compose([Validators.required])],
      'color': [""]
    })
  }

  ngOnInit() {
  }

  addEvent(id) {
    id = this.userInfoService.getUserInfo().userId;
    console.log("eventModel.start: " + this.eventModel.value.start);

    if (this.eventModel.value.start == null || this.eventModel.value.start == "") {
      if (confirm("You didn't choose the start date")) {

      }
    }
    if (this.eventModel.value.end == null || this.eventModel.value.end == "") {
      if (confirm("You didn't choose the end date")) {

      }
    } else {
      this.calendarService.addEvent(this.eventModel.value, id).subscribe(event => {
        event = this.eventModel.value;
        this._router.navigate(['/calendar']);
      })
    }
  }

}
