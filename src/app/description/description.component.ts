import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service'


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  description: string;
  selected_actId: string;
  selected_catId: number;
  activity: string;
  page_title: string;
  constructor( private router: Router,
               private actService: ActivityService,
               private route: ActivatedRoute,) { }

  ngOnInit() {

    this.selected_actId = this.route.snapshot.paramMap.get('actId');
    this.selected_catId = +this.route.snapshot.paramMap.get('catId');
    var activity_obj = this.actService.getSelectedActivity(this.selected_actId, this.selected_catId);
    this.activity =activity_obj.dname;
    this.page_title = this.activity;
  }

  onNext() {
  	console.debug(this.description);
  	if (this.description == undefined){
  		this.onSkip()
  	}
  	this.router.navigate([this.router.url + '/desc/' + this.description])
  }

  onSkip(){
  	this.router.navigate([this.router.url + '/desc/' + "null"])
  }
}
