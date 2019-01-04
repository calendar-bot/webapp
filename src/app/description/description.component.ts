import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  description: string;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onNext() {
  	console.debug(this.description);
  	if (this.description == undefined){
  		this.onSkip()
  	}
  	this.router.navigate([this.router.url + '/desc/' + this.description])
  }

  onSkip(){
  	this.router.navigate([this.router.url + '/desc/' + "null"])
  }
}
