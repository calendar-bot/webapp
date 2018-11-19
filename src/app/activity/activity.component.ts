import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
  	private route: ActivatedRoute,
  	private actService: ActivityService,
    private msgService: MessagingService) { }

  ngOnInit() {
  	this.getActivities();
  }

  getActivities() {
  	const id = +this.route.snapshot.paramMap.get('id');
  	console.log(id);
  	this.activities = this.actService.getActivities(id);
  	this.category = this.actService.getCategoryById(id);
  	console.log(this.activities);
  }

}
