import { Injectable } from '@angular/core';
import { CATEGORIES } from './mock-categories';
import { Category } from './category';
import { Activity } from './activity';
import { Observable, of } from 'rxjs';
import { Event } from './event';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

	message: string[];
	private host = 'http://localhost:9000'
	private get_categories_url = this.host + '/api/categories';

  constructor(
  	private http: HttpClient,
  	private msgService: MessagingService) { }

  getCategories(): Observable<Category[]> {
 //  	const httpOptions = {
 //  		headers: new HttpHeaders({ 'Content-Type': 'application/json',
 //  									'' })
	// };	
  	return this.http.get<Category[]>(this.get_categories_url);
  }

  getActivities(categoryId: number): Activity[] {
  	var act: Activity[];
  	for (let item of CATEGORIES) {
  		if (item.id == categoryId) {
  			act = item.activities;
  			break;
  		}
  	}
  	return act;
  }

  getCategoryById(categoryId: number): Category {
  	var cat: Category;
  	for (let item of CATEGORIES) {
  		if (item.id == categoryId) {
  			cat = item;
  			break;
  		}
  	}
  	return cat;
  }

  getTimeSlots(catId: number, actId: number, date: number): string[] {
  	var acts = this.getCategoryById(catId).activities;

  	for (let act of acts) {
  		if (act.id == actId)
  			return act.slots;
  	}
  }

  createEvent(event: Event) {
  	this.msgService.setCreateEventMsg("An event is created successfully, please check your Event list for confirmation!")
  }

}
