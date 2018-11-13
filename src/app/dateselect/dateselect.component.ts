import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	var now = new Date();
  	var i = 0;
  	for (var i = 0; i < 6; ++i) {
  		var d = new Date();
  		this.dates.push(new Date(d.setDate(now.getDate() + i)));
  	}
  	this.selected_actId = +this.route.snapshot.paramMap.get('actId');
  	this.selected_catId = +this.route.snapshot.paramMap.get('catId');
  }

}
