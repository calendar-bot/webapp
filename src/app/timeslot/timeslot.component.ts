import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import { Event } from '../event';
import { MessagingService } from '../messaging.service';


@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

	timeslots: string[];
  no_more_slots: boolean = true;
	res_msg: string
	selected_actId: number;
	selected_catId: number;
	selected_slot: string;
	selected_date: number;
  event_desc: string;
	timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  page_title: string;
  no_available_slots: boolean;
  constructor(  	
  	private route: ActivatedRoute,
    private router: Router,
  	private actService: ActivityService,
    private msgService: MessagingService) { }

  ngOnInit() {
  	this.getTimeslots()
  }

  onSelect(slot: string){
  	// create an Event and save on server
    console.debug("onSlect called!")
  	var ev: Event = {
	  					cat_id: this.selected_catId,
	  					act_id: this.selected_actId,
	  					date: this.selected_date,
	  					slot: this.calculateHour(slot) + ":00",
              desc: this.event_desc,
	  					timezone: this.timezone
  					};
    console.debug(ev)
  	this.actService.createEvent(ev).subscribe(msg => {
      console.debug("subscribe call")
      this.res_msg = msg;
      console.debug(this.res_msg);
      this.msgService.create_event_message = this.res_msg
      this.router.navigate(['/create_event_status'])
    },
    error => {
      console.debug(error);
      this.router.navigate(['/error'])
    });
    console.debug("onSelect end")
  }

  calculateHour(slot){
    var s = slot.split(" ")
    if (s[1] == "AM")
    {
      if (Number(s[0]) == 12)
        return "00";
      return Number(s[0]);
    }
    else {
      if (Number(s[0]) == 12)
        return Number(s[0]);
      return Number(s[0]) + 12;
    }
  }

  moreSlots(){
    length = 23;
    this.timeslots = [];
    for (var i = 0; i <= length; ++i) {
      this.timeslots.push(this.getTime(i));
    }
    this.no_more_slots = false;
  }

  getTime(time){
    if (time >=12){
      if (time != 12)
        time = (time - 12) + " PM"
      else 
        time = "12 PM";
    } else {
      if (time == 0) {
        time = "12 AM";
      } else {
        time = time + " AM"        
      }
    }
    return time;
  }


  getTimeslots() {
    this.page_title = this.msgService.event_title;
  	this.selected_actId = +this.route.snapshot.paramMap.get('actId');
  	this.selected_catId = +this.route.snapshot.paramMap.get('catId');
  	this.selected_date = +this.route.snapshot.paramMap.get('date');
    this.event_desc = this.route.snapshot.paramMap.get('desc');

    var activity = this.actService.getSelectedActivity(this.selected_actId, this.selected_catId);
    var category = this.actService.getCategoryById(this.selected_catId);
    var date = new Date(this.selected_date);
    this.page_title = "Event: " + category.name + ", " + activity.dname + ", " + date.toDateString();
    var timestamp = this.selected_date
    var ev: Event = {
              cat_id: this.selected_catId,
              act_id: this.selected_actId,
              date: timestamp,
              slot: "",
              desc: this.event_desc,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
    this.actService.getTimeSlots(ev).subscribe(
                                              slots => { 
                                                this.timeslots = slots; 
                                                if (slots.length == 0) 
                                                  this.no_available_slots = true;
                                                console.debug(this.no_available_slots)
                                              },
                                              error => {
                                                console.debug(error);
                                                this.router.navigate(['/error'])
                                              });
  }

}
