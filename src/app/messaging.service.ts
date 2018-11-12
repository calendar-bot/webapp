import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

	create_event_message : string

  constructor() { }

  setCreateEventMsg(msg: string) {
  	this.create_event_message = msg;
  }
}
