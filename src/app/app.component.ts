import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service'
import { Category } from './category';
import { User } from './user';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Calendar Bot';
  faCaretDown = faCaretDown;
  cats : Category[]; //load categories on application load
  user: User;
  sign_out_url: string;
  loggedIn: boolean;
  notLoggedIn: boolean;

  constructor(  	
  	private actService: ActivityService
	){}

  ngOnInit() {
  	console.debug('app init called')
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
      } else{
        this.notLoggedIn = true;
      }
    })

  }

  dropdownClick(){
    document.getElementById('logout').classList.toggle('show');
    window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
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
  }
}
