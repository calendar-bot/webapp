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
	selected_actId: string;
	selected_catId: number;
	tmp_date: Date = new Date();
  event_desc: string
  page_title: string
  n: number;

  constructor(private route: ActivatedRoute,
              private actService: ActivityService,
              private msgService: MessagingService) { }

  ngOnInit() {
    this.selected_actId = this.route.snapshot.paramMap.get('actId');
    this.selected_catId = +this.route.snapshot.paramMap.get('catId');
    this.event_desc = this.route.snapshot.paramMap.get('desc');
    var activity = this.actService.getSelectedActivity(this.selected_actId, this.selected_catId);
    var category = this.actService.getCategoryById(this.selected_catId);
    this.page_title = activity.dname;
    console.debug("page_title")
    console.debug(this.page_title)
  	// var now = new Date();
    // this.dates.push(now);
  	// for (var i = 1; i < 7; ++i) {
  	// 	var tempd = new Date();
   //    tempd.setDate(now.getDate() + i);
   //    tempd.setHours(0);
   //    tempd.setMinutes(0);
  	// 	this.dates.push(tempd);
  	// }
    this.n = 0
    this.nextWeek()
  }

  nextWeek() {
    // this.n = this.n + 1;
    var offset = this.n * 7;
    var now = new Date();
    this.dates = [];
    for (var i = offset; i < 7 + offset; ++i) {
      var tempd = new Date();
      tempd.setDate(now.getDate() + i);
      tempd.setHours(0);
      tempd.setMinutes(0);
      this.dates.push(tempd);
    }
    this.n = this.n + 1;
  }

  printDate(date: Date, i: number){
    // if (i == 0) return "Today";
    // if (i == 1) return "Tommorow";
    var d = date.toDateString();
    var weekday = d.substr(0, 3);
    var month = d.substr(4, 3);
    return weekday + ", " + date.getDate() + " " + month;
  }
}
