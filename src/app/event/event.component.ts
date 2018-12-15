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

  constructor(  	
  	private route: ActivatedRoute,
  	private actService: ActivityService
  ) { }

  ngOnInit() {
  	this.getEventById()
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
