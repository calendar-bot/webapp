import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService} from '../activity.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

	group: string;

  constructor(
  	private route: ActivatedRoute,
  	private actService: ActivityService,
  	private router: Router
  	) { 
  }

  ngOnInit() {
  }

  create_group() {
  	const eid = this.route.snapshot.paramMap.get('eid');
  	console.debug("creating group for: " + eid)
  	console.debug("title: " + this.group)
  	this.router.navigate(['/wait_msg'])
  	this.actService.createGroup(eid, this.group).subscribe(result => {
  		console.debug("group created successuly - " + result);
  		this.router.navigate(['/creategroupsuccess'])
  	},
  	err => {
  		console.debug(err);
      	this.router.navigate(['/error']);
  	})
  }

}
