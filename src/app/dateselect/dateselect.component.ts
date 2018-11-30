import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event'
import { ActivityService } from '../activity.service'
import { MessagingService } from '../messaging.service'


@Component({
  selector: 'app-dateselect',
  templateUrl: './dateselect.component.html',
  styleUrls: ['./dateselect.component.css']
})
export class DateselectComponent implements OnInit {

	dates: Date[] = [];
	selected_actId: number;
	selected_catId: number;
	tmp_date: Date = new Date();
  page_title: string

  constructor(private route: ActivatedRoute,
              private actService: ActivityService,
              private msgService: MessagingService) { }

  ngOnInit() {
    this.selected_actId = +this.route.snapshot.paramMap.get('actId');
    this.selected_catId = +this.route.snapshot.paramMap.get('catId');
    var activity = this.actService.getSelectedActivity(this.selected_actId, this.selected_catId);
    var category = this.actService.getCategoryById(this.selected_catId);
    this.page_title = "Event: " + category.name + ", " + activity.name;
    console.log("page_title")
    console.log(this.page_title)
  	var now = new Date();
    this.dates.push(now);
  	for (var i = 1; i < 6; ++i) {
  		var tempd = new Date();
      tempd.setDate(now.getDate() + i);
      tempd.setHours(0);
      tempd.setMinutes(0);
  		this.dates.push(tempd);
  	}
    console.log(this.dates)
  }

}
