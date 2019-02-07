import { Injectable } from '@angular/core';
import { Category } from './category';
import { Activity } from './activity';
import { EventData } from './eventdata';
import { User } from './user';
import { OnLoadData } from './onloaddata';

import { Observable, of, throwError } from 'rxjs';
import { Event } from './event';
import { Group } from './group';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';
import { catchError, retry } from 'rxjs/operators';
import {SERVER_HOST, environment} from '../environments/environment';
import {Feedback} from './feedback';



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

	message: string[];
  CATEGORIES: Category[];
  LOGIN_STATUS: boolean;
  LOGGEDIN_USER: User;
	private host = SERVER_HOST;
	private get_categories_url = this.host + '/api/categories';
  private create_event_url = this.host + '/api/createevent';
	private get_free_slots_url = this.host + '/api/freeslots';
	private get_login_status_url = this.host + '/api/loginstatus';
  private get_loggedin_url = this.host + '/api/userinfo';
  private get_application_onload_data = this.host + '/api/onload';
  private get_event_url = this.host + '/api/event';
  private get_event_list_url = this.host + '/api/eventlist';
  private get_group_list_url = this.host + '/api/grouplist';
  private get_submit_contact_us_url = this.host + '/api/contact/submit';


  private httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain'
      })
    };

  constructor(
  	private http: HttpClient,
  	private msgService: MessagingService) { }

  getEventList(): Observable<EventData> {
    return this.http.get<EventData>(this.get_event_list_url, {withCredentials: true});
  }

  getContactUsURL(): Observable<string[]> {
    return this.http.get<string[]>(this.get_submit_contact_us_url, {withCredentials: true});
  }

  getGroupList(): Observable<Group[]> {
    return this.http.get<Group[]>(this.get_group_list_url, {withCredentials: true});
  }

  getLogginStatus(): Observable<boolean> {
  	return this.http.get<boolean>(this.get_login_status_url, {withCredentials: true});
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(this.get_loggedin_url, {withCredentials: true});
  }

  getOnloadData(): Observable<OnLoadData> {
    return this.http.get<OnLoadData>(this.get_application_onload_data, {withCredentials: true});
  }


  getCategories(): Observable<Category[]> {
  	return this.http.get<Category[]>(this.get_categories_url, {withCredentials: true});
  }

  setCategories(cats: Category[]){
    console.debug("set category called")
    console.debug(cats)
    this.CATEGORIES = cats;
  }

  setLoggedInUser(user: User) {
    this.LOGGEDIN_USER = user;
    if (user != null) {
      this.LOGIN_STATUS = true;
    }
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

  sendFeedback(msg: Feedback): Observable<string> {
    console.debug('send feedback');
    console.debug(msg);
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain'
      })
    };
    return this.http.post<string>(this.get_submit_contact_us_url, msg, httpOptions);
  }

  saveActivity(act: string, cat: number): Observable<Activity> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain'
      })
    };
    console.debug(cat, act)
    return this.http.post<Activity>(this.host + '/api/category/' + cat + '/activity/' + act, act, httpOptions);
  }

  createEvent(event: Event): Observable<string> {
  	console.debug('create event');
  	console.debug(event)
  	// this.msgService.setCreateEventMsg("An event is created successfully, please check your Event list for confirmation!");
  	const httpOptions = {
  	  withCredentials: true,
  	  headers: new HttpHeaders({
  	    'Content-Type':  'text/plain'
  	  })
	  };
  	return this.http.post<string>(this.create_event_url, event, httpOptions);
	
	}

  createGroup(eid: string, group: string): Observable<boolean>{
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain'
      })
    };
    return this.http.post<boolean>(this.host + '/api/group/' + group + '/event/' + eid, 
                                   event, httpOptions);
  }


  cancelEvent(eid: string): Observable<string> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
      }),
    };
    return this.http.post<string>(this.host + "/api/deleteevent" + '/' + eid, eid, httpOptions)
  }

  getEventById(eid: string): Observable<string> {
      return this.http.get<string>(this.get_event_url + '/' + eid, {withCredentials: true});
  }

  addParticipant(url: string): Observable<string> {
    return this.http.get<string>(this.host + "/api" + url, {withCredentials: true})
  }

  getActivities(categoryId: number): Activity[] {
    console.debug("get activities")
    console.debug(this.CATEGORIES)
  	var act: Activity[];
  	for (let item of this.CATEGORIES) {
  		if (item.id == categoryId) {
  			act = item.activities;
  			break;
  		}
  	}
  	return act;
  }

  getSelectedActivity(act_id:string, cat_id: number): Activity {
    var act: Activity;
    var acts = this.getActivities(cat_id);
    console.debug("%%%%%%%%%%")
    console.debug(act_id)
    console.debug(acts)
    for (let item of acts) {
      console.log(item.id)
      if (item.id.toString() == act_id){
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
    console.debug(this.CATEGORIES)
    console.debug(cat)
  	return cat;
  }

  getSignInBaseUrl(redirect_url) {
    var sign_in_url: string;
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!environment.production) {
      console.debug("Integration login! Switch the environment setting in app to production for productive instance.")
      sign_in_url = "http://localhost:9000/authorize"
    }
    else {
      sign_in_url = window.location.origin + "/auth/authorize"
    }
    if (redirect_url != null){
      sign_in_url = sign_in_url + redirect_url;
    }
    sign_in_url = sign_in_url + "?timezone=" + timezone; 
    return sign_in_url;
  }

  getSignOutUrl(){
    if (!environment.production) {
      return "http://localhost:9000/clear"
    }
    else {
      return window.location.origin + "/auth/clear"
    }
  }

  // getTimeSlots(catId: number, actId: number, date: number): string[] {
  // 	var acts = this.getCategoryById(catId).activities;

  // 	for (let act of acts) {
  // 		if (act.id == actId)
  // 			return act.slots;
  // 	}
  // }
  	
}
