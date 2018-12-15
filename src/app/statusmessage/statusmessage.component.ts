import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Injectable({
  providedIn: 'root'
})
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

  onSelect() {
  	let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.create_msg["url"];
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }



}
