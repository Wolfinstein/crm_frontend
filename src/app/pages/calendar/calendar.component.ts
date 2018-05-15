import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {Subject} from 'rxjs/Subject';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {CalendarService} from "../../services/api/calendar.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../../services/user-info.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#ad2121'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#1e90ff'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#e3bc08'
  },
  green: {
    primary: '#52D017',
    secondary: '#52D017'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: string = 'month';
  viewDate: Date = new Date();
  modalData: {
    action: string; event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this._router.navigate(['/event/edit/' + event.id]);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        if (confirm("Do You want delete this event?")) {
          this.calendarService.deleteEvent(event.id).subscribe(data => {
            this.events = [data];
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.getEvents();
          });
        }
      }
    }
  ];
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private calendarService: CalendarService, private _router: Router,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.calendarService.getAllEvents()
      .subscribe(data => {
        this.events = data;

        if (data == null) {

        } else {
          data.forEach((d) => {
              d.start = new Date(d.start);
              d.end = new Date(d.end);
              d.actions = this.actions;
              d.draggable = false;
              if (d.color == "red") {
                d.color = colors.red;
              }
              if (d.color == "yellow") {
                d.color = colors.yellow;
              }
              if (d.color == "blue") {
                d.color = colors.blue;
              }
              if (d.color == "green") {
                d.color = colors.green;
              }
            }
          );
        }

        return data;

      });
  }


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(id): void {
    id = this.userInfoService.getUserInfo().userId;
    this._router.navigate(['/event/' + id]);
  }
}
