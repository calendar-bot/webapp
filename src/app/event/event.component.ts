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
  display_timezone: boolean;
  timezone: string;
	// eparticipants: any;
	user_logged_in: boolean;
	user_not_organizer: boolean;
	logged_in_uid: string;
	user_not_participant: boolean;
	sign_in_url: string;
	new_participant_added: boolean;
	error: boolean;
	rsvp_yes: any;
	rsvp_no: any;

  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.getEventById()

  }

  notJoinEvent() {
  	console.debug("not joining");
	var url = this.router.url + "/participant/ignore";
  	this.actService.addParticipant(url).subscribe(result => {
  		console.debug("participant added successuly - " + result);
  		this.router.navigate(['/event_reject_success'])
  	},
  	err => {
  		console.debug(err);
  		this.error = true;
  	})
  }

  joinEvent() {
  	console.debug("join event");
  	// this.router.
  	if (this.logged_in_uid != null) {
	  	var url = this.router.url + "/participant/joining";
	  	this.actService.addParticipant(url).subscribe(result => {
	  		console.debug("participant added successuly - " + result);
	  		this.router.navigate(['/event_joined_success'])
	  	},
	  	err => {
	  		console.error(err);
	  		this.error = true;
	  	})
  	} else {
  		console.debug("User is not logged in")
  	}
  }

  getUserFromList(event_users){
  	var users = [];
  		for (let user of event_users) {
  			users.push(user.fullname);
  		}
	return event_users.length == 0? null : users;
  }

  getEventById() {
  	this.eid = this.route.snapshot.paramMap.get('eid');
  	console.debug(this.eid)
  	this.actService.getEventById(this.eid).subscribe(event => {
  		console.debug(event)
  		this.ename = event["name"];
  		this.edate = event["start_time_formatted"];
  		this.eorg = event["organizer"];
  		this.etime = event["time"];
      this.display_timezone = event["display_timezone"];
      if (this.display_timezone)
        this.timezone = event["timezone"];
  		console.debug(event["description"] == "null")
  		this.edesc = event["description"] == "null"? "": event["description"];
  		this.user_logged_in = event["uid"] == null? false: true;
  		this.logged_in_uid = event["uid"]
  		console.debug("logged_in_uid - " + this.logged_in_uid)
  		
  		this.rsvp_yes = this.getUserFromList(event["rsvp_yes"]);
  		this.rsvp_no = this.getUserFromList(event["rsvp_no"]);

  		this.user_not_organizer = event["organizer"] != event["uid"]? true : false;
  		this.user_not_participant = event["user_not_participant"]
  		console.debug(this.user_not_organizer)
  		// console.debug(this.eparticipants)

  		if (!this.user_logged_in) {
  			this.sign_in_url = this.actService.getSignInBaseUrl(this.router.url)
  			console.debug(this.sign_in_url);
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
