import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {

	private group_list: Group[];
	private no_groups: boolean;

  constructor(
        private actService: ActivityService,
        private router: Router

  	) { }

  ngOnInit() {
  	this.getGroupList()
  }

  getGroupList(){
  	this.actService.getGroupList().subscribe(result => {
  		console.debug(result)
  		this.group_list = result
  		if (this.group_list.length == 0)
  			this.no_groups = true
  	},
  	error => {
  		console.error(error)
      if (error.status == 401) {
        this.router.navigate(['/signin'])
      } else {
        this.router.navigate(['/error'])
      }
  	})
  }
}
