import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../activity';
import { ActivityService} from '../activity.service';
import { Category } from '../category';
import { MessagingService } from '../messaging.service'


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities: Activity[];
  act_suggestions: Activity[];
  cats : Category[];

  category: Category;
  newactivity: string;
  newactflag: boolean = false;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	private actService: ActivityService,
    private msgService: MessagingService) { }

  ngOnInit() {
    this.getCats()
  }

  getCats() {
    this.actService.getCategories().subscribe(cats => {
      this.cats = cats;
      this.actService.setCategories(cats);
      this.getActivitySuggestions();
      this.activities = this.actService.getActivities(1);
    },
    error => {
      console.error(error)
      if (error.status == 401) {
        this.router.navigate(['/signin'])
      } else {
        this.router.navigate(['/error'])
      }
    });

  }

  getActivitySuggestions(){
    this.actService.getActivitySuggestions().subscribe(acts => {
      this.act_suggestions = acts;
    },
    error => {
      console.error("Error in getting activity suggestions")
    })
  }

  onSave(){
    console.debug(this.newactivity)
    this.actService.saveActivity(this.newactivity, 1).subscribe(act => {
      console.debug(act)
      this.activities.push(act);
      this.newactivity = null;
      this.newactflag = false;
    },
    error => {
        this.router.navigate(['/error'])
    })
  }


  // TODO: ADD A SERVICE REQUEST TO REMOVE SELECTED ACTIVITY FROM DATABASE
  onRemoveChip(act: Activity){
    var index = this.activities.indexOf(act);
    this.activities.splice(index, 1);
    console.log("Removing chip");
    event.stopPropagation();
  }

  onAddNew(){
    this.newactflag = true;
  }

  onSuggestionSelect(item, index) {
    console.debug(item)
    this.actService.saveActivity(item.dname, 1).subscribe(act => {
      console.debug(act)
      this.activities.push(act);
      delete this.act_suggestions[index]
      // this.newactivity = null;
      // this.newactflag = false;
    },
    error => {
        this.router.navigate(['/error'])
    })
  }

}
