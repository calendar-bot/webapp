import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import {environment} from '../../environments/environment'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	notLoggedIn: boolean;
	loggedIn: boolean;
	sign_in_url: string;
	sign_out_url: string;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private actService: ActivityService, private rout: Router) { }

  ngOnInit() {
  	this.checkIfLoggedIn();
  	// this.setSignInUrl();
    this.sign_in_url = this.actService.getSignInBaseUrl("/eventlist")
  	this.setSignOutUrl();
  }

  checkIfLoggedIn() {
  	this.actService.getLogginStatus().subscribe(status => {this.notLoggedIn = !status;
  															this.loggedIn = status});
  }

  setSignInUrl(){
  	if (!environment.production) {
  		console.debug("Integration login! Switch the environment setting in app to production for productive instance.")
  		this.sign_in_url = "http://localhost:9000/authorize/cats"
  	}
  	else {
  		this.sign_in_url = window.location.origin + "/auth/authorize/cats"
  	}
  }

  setSignOutUrl(){
  	if (!environment.production) {
  		this.sign_out_url = "http://localhost:9000/clear"
  	}
  	else {
  		this.sign_out_url =  window.location.origin + "/auth/clear"
  	}
  }
  goForward(){
    history.forward()
  }
  goBack(){
    history.back()
  }

}
