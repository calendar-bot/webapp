import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';


@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

	event_list: string[];
	no_planned_events: boolean;
	// signin: boolean
	// sign_in_url: string;

  constructor(private actService: ActivityService) { }

  ngOnInit() {
  	// this.sign_in_url = this.actService.getSignInBaseUrl()
  	this.getEventList();
  }

  getEventList(){
  	this.actService.getEventList().subscribe(result => {
  		console.debug(result)
  		this.event_list = result
  		if (this.event_list.length == 0)
  			this.no_planned_events = true
  	},
  	err => {
  		console.debug(err)
  	})
  }

}
