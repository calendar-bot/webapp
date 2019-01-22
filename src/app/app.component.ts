import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service'
import { Category } from './category';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Calendar Bot';
  cats : Category[]; //load categories on application load
  user: User;
  constructor(  	
  	private actService: ActivityService
	){}

  ngOnInit() {
  	console.debug('app init called')
  	this.getCats();
  }

  getCats() {
  	// this.actService.getCategories().subscribe(cats => {
   //    this.cats = cats;
   //    this.actService.setCategories(cats);
   //  });

    this.actService.getOnloadData().subscribe(data => {
    	// this.cats = data.cats;
    	this.user = data.user;
      // this.actService.setCategories(this.cats);
      this.actService.setLoggedInUser(this.user)
    })

  }
}
	