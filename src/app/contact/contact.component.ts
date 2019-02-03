import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedback: string;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onNext() {
  	console.debug(this.feedback);
  	if (this.feedback === undefined){
  		this.onSkip()
  	}
  	// this.router.navigate([this.router.url + '/desc/' + this.description])
    console.log('successful');
  	console.log(this.router.url);
  	this.router.navigate(([this.router.url + '/submit']))
  }

  onSkip(){
  	// this.router.navigate([this.router.url + '/desc/' + "null"])
    console.log('successful skip');
  }
}
