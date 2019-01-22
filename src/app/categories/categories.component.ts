import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';
import { Category } from '../category';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  cats : Category[];

  constructor(
    private catService: ActivityService,
    private router: Router
) { }

  ngOnInit() {
  	this.getCats();
  }

  getCats() {
  	this.catService.getCategories().subscribe(cats => {
      this.cats = cats;
      this.catService.setCategories(cats);
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
}