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
	selected_actId: number;
	selected_catId: number;
	selected_slot: string;
	selected_date: number;
  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService
) { }

  ngOnInit() {
  	this.getTimeslots()
  }

  onSelect(slot: string){
  	// create an Event and save on server
  	var ev: Event = {category: this.selected_catId,
  					activity: this.selected_catId,
  					date: this.selected_date,
  					timeslot: this.selected_slot};
  	this.actService.createEvent(ev);

  }

  getTimeslots() {
  	this.selected_actId = +this.route.snapshot.paramMap.get('actId');
  	this.selected_catId = +this.route.snapshot.paramMap.get('catId');
  	this.selected_date = +this.route.snapshot.paramMap.get('date');
  	this.timeslots = this.actService.getTimeSlots(this.selected_catId, this.selected_actId, this.selected_date);
  	console.log(this.timeslots);
  }

}
