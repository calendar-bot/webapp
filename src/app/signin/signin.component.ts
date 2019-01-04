import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sign_in_url: string;
  constructor(private actService: ActivityService,
  			  private router: Router) { }

  ngOnInit() {
  	this.sign_in_url = this.actService.getSignInBaseUrl("/eventlist")
  	this.actService.getLogginStatus().subscribe(loggin_status => {
  		if (loggin_status == true){
  			console.debug("user is loggedin")
  			this.router.navigate(['/eventlist'])
  		}
  	})
  	
  }

}
