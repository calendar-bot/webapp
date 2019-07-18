import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarCheck, faUsers, faThList} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sign_in_url: string;
  login_status: boolean;
  faCalendarCheck = faCalendarCheck;
  faUsers = faUsers;
  faThList= faThList;

  constructor(private actService: ActivityService,
  			  private router: Router) { }

  ngOnInit() {
  	this.sign_in_url = this.actService.getSignInBaseUrl("/eventlist")
  	this.actService.getLogginStatus().subscribe(loggin_status => {
              this.login_status = loggin_status

  		// if (loggin_status == true){
  		// 	console.debug("user is loggedin")
  			// this.router.navigate(['/eventlist'])
  		// }
  	})
  	
  }

}
