import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService} from '../activity.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	eid: string;
	ename: string;
	edate: Date;
	etime: string;
	eorg: string;
	edesc: string;
	eparticipants: any;
	user_logged_in: boolean;
	user_not_organizer: boolean;
	logged_in_uid: string;
	user_not_participant: boolean;
	sign_in_url: string;
	new_participant_added: boolean;
	error: boolean;

  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.getEventById()

  }

  joinEvent() {
  	console.log("join event");
  	// this.router.
  	if (this.logged_in_uid != null) {
	  	var url = this.router.url + "/participant";
	  	this.actService.addParticipant(url).subscribe(result => {
	  		console.log("participant added successuly - " + result);
	  		this.router.navigate(['/event_joined_success'])
	  	},
	  	err => {
	  		console.log(err);
	  		this.error = true;
	  	})
  	} else {
  		console.log("User is not logged in")
  	}
  }

  getEventById() {
  	this.eid = this.route.snapshot.paramMap.get('eid');
  	console.log(this.eid)
  	this.actService.getEventById(this.eid).subscribe(event => {
  		console.log(event)
  		this.ename = event["name"];
  		this.edate = new Date(event["start_date"]);
  		this.eorg = event["organizer"];
  		this.etime = this.getTime(event["time"]);
  		console.log(event["description"] == "null")
  		this.edesc = event["description"] == "null"? "": event["description"];
  		this.user_logged_in = event["uid"] == null? false: true;
  		this.logged_in_uid = event["uid"]
  		console.log("logged_in_uid - " + this.logged_in_uid)
  		var participants = [];
  		for (let item of event["participants"]) {
  			participants.push(item.name);
  		}
  		this.eparticipants = event["participants"].length == 0? "None" : participants;
  		this.user_not_organizer = event["organizer"] != event["uid"]? true : false;
  		this.user_not_participant = event["user_not_participant"]
  		console.log(this.user_not_organizer)
  		console.log(this.eparticipants)

  		if (!this.user_logged_in) {
  			this.sign_in_url = this.actService.getSignInBaseUrl() + this.router.url
  			console.log(this.sign_in_url);
  		} else {
  			this.sign_in_url = this.router.url + "/participant/" + this.logged_in_uid;
  		}
  	})
  }

  getTime(time){
  	if (time >12){
  		time = (time - 12) + " PM"
  	} else {
  		time = time + " AM"
  	}
  	return time;

  }

}
