import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService} from '../activity.service';
import { ClipboardService } from 'ngx-clipboard'


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	eid: string;
  gid: string;
	ename: string;
	edate: Date;
	etime: string;
	eorg: string;
	edesc: string;
  display_timezone: boolean;
  timezone: string;
	// eparticipants: any;
	user_logged_in: boolean;
	user_is_organizer: boolean;
	logged_in_uid: string;
	user_not_participant: boolean;
	sign_in_url: string;
	new_participant_added: boolean;
	error: boolean;
	rsvp_yes: any;
	rsvp_no: any;
  url_copied: boolean = false;
  isActive: boolean = true;
  isCanceled: boolean = false;
  show_accepted: boolean = true;
  show_declined: boolean = false;
  page_limit: number = 5;

  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService,
  	private router: Router,
    private _clipboardService: ClipboardService
  ) { }

  ngOnInit() {
  	this.getEventById()

  }

  notJoinEvent() {
  	console.debug("not joining");
	  var url = this.router.url + "/participant/ignore";
    this.router.navigate(['/wait_msg'])
  	this.actService.addParticipant(url).subscribe(result => {
  		console.debug("participant added successuly - " + result);
  		this.router.navigate(['/event_reject_success'])
  	},
  	err => {
  		console.debug(err);
      this.router.navigate(['/error']);
  	})
  }

  joinEvent() {
  	console.debug("join event");
  	// this.router.
  	if (this.logged_in_uid != null) {
      this.router.navigate(['/wait_msg'])
	  	var url = this.router.url + "/participant/joining";
	  	this.actService.addParticipant(url).subscribe(result => {
	  		console.debug("participant added successuly - " + result);
	  		this.router.navigate(['/event_joined_success'])
	  	},
	  	err => {
	  		console.error(err);
        this.router.navigate(['/error']);
	  	})
  	} else {
  		console.debug("User is not logged in")
  	}
  }

  getEventById() {
  	this.eid = this.route.snapshot.paramMap.get('eid');
  	console.debug(this.eid)
  	this.actService.getEventById(this.eid).subscribe(event => {
  		console.debug(event)
  		this.ename = event["name"];
      this.gid = event["gid"];
  		this.edate = event["start_time_formatted"];
  		this.eorg = event["organizer"];
      this.isCanceled = event["status"] == 'CANCELED'? true: false
      this.isActive = event["status"] == 'ACTIVE' ? true: false
  		this.etime = event["time"];
      this.display_timezone = event["display_timezone"];
      if (this.display_timezone)
        this.timezone = event["timezone"];
  		console.debug(event["description"] == "null")
  		this.edesc = event["description"] == "null"? "": event["description"];
  		this.user_logged_in = event["uid"] == null? false: true;
  		this.logged_in_uid = event["uid"]
  		console.debug("logged_in_uid - " + this.logged_in_uid)
  		
  		this.rsvp_yes = event["rsvp_yes"];
  		this.rsvp_no = event["rsvp_no"].length == 0? null : event["rsvp_no"];

  		this.user_is_organizer = event["organizer"] == event["uid"]? true : false;

  		this.user_not_participant = event["user_not_participant"]

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

  copy(){
    this._clipboardService.copyFromContent(window.location.href)
    this.url_copied = true
    var that = this
    window.setTimeout(function(){
      that.url_copied = false;
    }, 5000)

  }

  reschedule(){
    this.actService.reschedule_dummy().subscribe(result => {
      console.debug(result)
    })
    alert("This feature is not available. For now, you may cancel the event and re-create it!")
  }

  cancel(){
    if (confirm('Cancel the event?')){
      this.router.navigate(['/wait_msg'])
      console.log("canceling...")
      this.actService.cancelEvent(this.eid).subscribe(result => {
      console.debug(result)
      this.router.navigate(['/eventlist'])
      },
      err => {
          console.error(err);
          this.router.navigate(['/error'])
      })
    } 
  }

  go_to_group(){
    this.router.navigate(['/group/' + this.eid])
  }

  showAcceptedBy(){
    console.debug("display accepted by")
    this.show_declined = false
    this.show_accepted = true
    this.page_limit = 5

    var elem = document.getElementById("acceptedby")
    console.log(elem)
  }

  showDeclinedBy(){
     this.show_accepted = false
     this.show_declined = true
     this.page_limit = 5
  }
  showMore(){
    this.page_limit = this.page_limit + 10;
  }
}
