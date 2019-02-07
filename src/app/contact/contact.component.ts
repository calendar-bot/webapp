import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import {Feedback} from '../feedback';

import { Router } from '@angular/router';
import {Event} from '../event';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedback: string;

  constructor( private router: Router,
               private actService: ActivityService) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.router.navigate(([this.router.url + '/submit']));
    console.log(this.feedback);
    var msg: Feedback = {
	  					msg: this.feedback
  					};
  	this.actService.sendFeedback(msg).subscribe(sentFbck => {
      console.debug(sentFbck);
    },
    error => {
        this.router.navigate(['/error']);
    })
  }
}
