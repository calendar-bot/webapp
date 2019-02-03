import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service'
import { Category } from './category';
import { User } from './user';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Rsvpezly';
  cats: Category[]; //load categories on application load
  user: User;
  loggedIn: boolean;
  notLoggedIn: boolean;
  sign_out_url: string;

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
      if (this.user){
        this.loggedIn = true;
        this.setSignOutUrl()
      } else{
        this.notLoggedIn = true;
      }
    })

  }

    setSignOutUrl(){
  	if (!environment.production) {
  		this.sign_out_url = "http://localhost:9000/clear"
  	}
  	else {
  		this.sign_out_url =  window.location.origin + "/auth/clear"
  	}
    }


  dropdownClick(){
    document.getElementById('logout').classList.toggle('show');
    // window.onclick = function(event) {
    //   dif (!event.target.matches('.dropbtn')) {
    //     var dropdowns = document.getElementsByClassName("dropdown-content");
    //     var i;
    //     for (i = 0; i < dropdowns.length; i++) {
    //       var openDropdown = dropdowns[i];
    //       if (openDropdown.classList.contains('show')) {
    //         openDropdown.classList.remove('show');
    //       }
    //     }
    //   }
    // };
  }
}
