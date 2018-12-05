import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import {environment} from '../../environments/environment'

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

  constructor(private actService: ActivityService, private rout: Router) { }

  ngOnInit() {
  	this.checkIfLoggedIn();
  	this.setSignInUrl();
  	this.setSignOutUrl();
  }

  checkIfLoggedIn() {
  	this.actService.getLogginStatus().subscribe(status => {this.notLoggedIn = !status;
  															this.loggedIn = status});
  }

  setSignInUrl(){
  	if (!environment.production) {
  		console.log("Integration login! Switch the environment setting in app to production for productive instance.")
  		this.sign_in_url = "http://localhost:9000/authorize"
  	}
  	else {
  		this.sign_in_url = window.location.origin + "/auth/authorize"
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

}
