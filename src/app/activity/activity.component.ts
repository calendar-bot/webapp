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
  category: Category;
  newactivity: string;
  newactflag: boolean = false;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	private actService: ActivityService,
    private msgService: MessagingService) { }

  ngOnInit() {
  	this.getActivities();
  }

  getActivities() {
  	const id = +this.route.snapshot.paramMap.get('id');
  	console.debug(id);
  	this.activities = this.actService.getActivities(id);
  	this.category = this.actService.getCategoryById(id);
  	console.debug(this.activities);
  }

  onSave(){
    console.debug(this.newactivity)
    this.actService.saveActivity(this.newactivity, this.category.id).subscribe(act => {
      console.debug(act)
      this.activities.push(act);
      this.newactivity = null;
      this.newactflag = false;
    },
    error => {
        this.router.navigate(['/error'])
    })
  }

  onAddNew(){
    this.newactflag = true;
  }

}
