import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

	event_list: string[];
	no_planned_events: boolean;
  upcoming: boolean = true;
  upcoming_events: string[] = [];
  past_events: string[] = [];
	// signin: boolean
	// sign_in_url: string;

  constructor(
        private actService: ActivityService,
        private router: Router
) { }

  ngOnInit() {
  	// this.sign_in_url = this.actService.getSignInBaseUrl()
  	this.getEventList();
  }

  getEventList(){
  	this.actService.getEventList().subscribe(result => {
  		console.debug(result)
  		this.event_list = result.upcoming
      this.upcoming_events = result.upcoming
      this.past_events = result.past
  		if (this.event_list.length == 0)
  			this.no_planned_events = true
  	},
  	error => {
  		console.error(error)
      if (error.status == 401) {
        this.router.navigate(['/signin'])
      } else {
        this.router.navigate(['/error'])
      }
  	})
  }

  showUpcoming(){
    this.upcoming = true;
  }

  showPast(){
    this.upcoming = false;
  }
}
