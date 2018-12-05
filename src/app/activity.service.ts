import { Injectable } from '@angular/core';
import { Category } from './category';
import { Activity } from './activity';
import { Observable, of, throwError } from 'rxjs';
import { Event } from './event';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';
import { catchError, retry } from 'rxjs/operators';
import {SERVER_HOST} from '../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

	message: string[];
  CATEGORIES: Category[];
	private host = SERVER_HOST;
	private get_categories_url = this.host + '/api/categories';
  private create_event_url = this.host + '/api/createevent';
	private get_free_slots_url = this.host + '/api/freeslots';
	private get_login_status_url = this.host + '/api/loginstatus';


  constructor(
  	private http: HttpClient,
  	private msgService: MessagingService) { }

  getLogginStatus(): Observable<boolean> {
  	return this.http.get<boolean>(this.get_login_status_url, {withCredentials: true});
  }

  getCategories(): Observable<Category[]> {
  	return this.http.get<Category[]>(this.get_categories_url, {withCredentials: true});
  }

  setCategories(cats: Category[]){
    console.log("set category called")
    this.CATEGORIES = cats;
  }

  getTimeSlots(event: Event): Observable<string[]> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain'
      })
    };
    return this.http.post<string[]>(this.get_free_slots_url, event, httpOptions);
  }

  createEvent(event: Event): Observable<string> {
  	console.log('create event');
  	console.log(event)
  	this.msgService.setCreateEventMsg("An event is created successfully, please check your Event list for confirmation!");
  	const httpOptions = {
  	  withCredentials: true,
  	  headers: new HttpHeaders({
  	    'Content-Type':  'text/plain'
  	  })
	  };
  	return this.http.post<string>(this.create_event_url, event, httpOptions);
	
	}

  getActivities(categoryId: number): Activity[] {
    console.log("get activities")
    console.log(this.CATEGORIES)
  	var act: Activity[];
  	for (let item of this.CATEGORIES) {
  		if (item.id == categoryId) {
  			act = item.activities;
  			break;
  		}
  	}
  	return act;
  }

  getSelectedActivity(act_id:number, cat_id: number): Activity {
    var act: Activity;
    var acts = this.getActivities(cat_id);
    for (let item of acts) {
      if (item.id == act_id){
        act = item
        return act;
      }
    }
    return act;
  }

  getCategoryById(categoryId: number): Category {
  	var cat: Category;
  	for (let item of this.CATEGORIES) {
  		if (item.id == categoryId) {
  			cat = item;
  			break;
  		}
  	}
  	return cat;
  }

  // getTimeSlots(catId: number, actId: number, date: number): string[] {
  // 	var acts = this.getCategoryById(catId).activities;

  // 	for (let act of acts) {
  // 		if (act.id == actId)
  // 			return act.slots;
  // 	}
  // }
  	
}
