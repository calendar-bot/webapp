import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service'
import { Event } from '../event';



@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

	timeslots: string[];
	res_msg: string
	selected_actId: number;
	selected_catId: number;
	selected_slot: string;
	selected_date: number;
	timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService
) { }

  ngOnInit() {
  	this.getTimeslots()
  }

  onSelect(slot: string){
  	// create an Event and save on server
  	var ev: Event = {
	  					cat_id: this.selected_catId,
	  					act_id: this.selected_actId,
	  					date: this.selected_date,
	  					slot: slot,
	  					timezone: this.timezone
  					};
  	this.actService.createEvent(ev).subscribe(msg => this.res_msg);
  	console.log(this.res_msg);
  }

  getTimeslots() {
  	this.selected_actId = +this.route.snapshot.paramMap.get('actId');
  	this.selected_catId = +this.route.snapshot.paramMap.get('catId');
  	this.selected_date = +this.route.snapshot.paramMap.get('date');
    var timestamp = this.selected_date
    var ev: Event = {
              cat_id: this.selected_catId,
              act_id: this.selected_actId,
              date: timestamp,
              slot: "",
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
    this.actService.getTimeSlots(ev).subscribe(slots => this.timeslots = slots);
  	console.log(this.timeslots);
  }

}
