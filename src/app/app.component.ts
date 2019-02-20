import { Component, OnInit, HostListener} from '@angular/core';
import { ActivityService } from './activity.service'
import { Category } from './category';
import { User } from './user';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  faCaretDown = faCaretDown;
  title = 'Rsvpezly';
  cats: Category[]; //load categories on application load
  user: User;
  sign_out_url: string;
  loggedIn: boolean;
  notLoggedIn: boolean;
  contact_us_url: string;
  show_dropdown: boolean;
  dropwdown_status: string;
  current_date: string

  constructor(private actService: ActivityService
	){}

  ngOnInit() {
  	console.debug('app init called')
    var d = new Date()
    this.current_date = d.toDateString();
  	this.getCats();
    this.sign_out_url = this.actService.getSignOutUrl();
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


  dropdownClick($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
    document.getElementById('logout').classList.toggle('show');
  }

  @HostListener('document:click', ['$event'])
  revertdropdown() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
