import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-statusmessage',
  templateUrl: './statusmessage.component.html',
  styleUrls: ['./statusmessage.component.css']
})
export class StatusmessageComponent implements OnInit {

	create_msg: string;

  constructor(private msgService: MessagingService) { }

  ngOnInit() {
  	this.create_msg = this.msgService.create_event_message;
  }



}
