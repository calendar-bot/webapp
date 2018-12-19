import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';


@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

	event_list: string[];


  constructor(private actService: ActivityService) { }

  ngOnInit() {
  	this.getEventList();
  }

  getEventList(){
  	this.actService.getEventList().subscribe(result => {
  		console.log(result)
  		this.event_list = result;
  	},
  	err => {
  		console.log(err)
  	})
  }

}
