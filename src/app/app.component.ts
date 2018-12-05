import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service'
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Calendar Bot';
  cats : Category[];

  constructor(  	
  	private actService: ActivityService
	){}

  ngOnInit() {
  	console.log('app init called')
  	this.getCats();
  }

  getCats() {
  	this.actService.getCategories().subscribe(cats => {
      this.cats = cats;
      this.actService.setCategories(cats);
    });

  }
}
	