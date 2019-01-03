import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sign_in_url: string;
  constructor(private actService: ActivityService) { }

  ngOnInit() {
  	this.sign_in_url = this.actService.getSignInBaseUrl("/eventlist")
  }

}
