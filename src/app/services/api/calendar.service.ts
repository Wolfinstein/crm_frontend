import {Injectable} from "@angular/core";
import {ApiRequestService} from "./api-request.service";
import {FormGroup} from "@angular/forms";
import {EventModel} from "../../models/event.model";

@Injectable()
export class CalendarService {

  constructor(private apiRequest: ApiRequestService) {
  }

  getAllEvents() {
    return this.apiRequest.get('/events');
  }

  getEvent(id) {
    return this.apiRequest.get('/event/' + id);
  }

  editEvent(id, event: EventModel) {
    return this.apiRequest.put("/event/edit/" + id, event)
  }

  addEvent(event: FormGroup, id) {
    return this.apiRequest.post("event/" + id, event);
  }

  deleteEvent(id) {
    return this.apiRequest.delete("event/" + id);
  }

}
