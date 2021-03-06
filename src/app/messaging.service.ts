import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

	create_event_message : string;
	event_title: string;

  constructor() { }

  setCreateEventMsg(msg: string) {
  	this.create_event_message = msg;
  }

  setEventTitle(msg: string) {
  	this.event_title = msg
  }

  updateEventTitle(msg: string){
  	this.event_title = this.event_title + msg
  }

  getCreateEventMessage(): Observable<string>{
     return of(this.create_event_message)
    }
}

