import { Component, OnInit } from '@angular/core';
import { ActivityService} from '../activity.service';
import { Category } from '../category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  cats : Category[];

  constructor(private catService: ActivityService) { }

  ngOnInit() {
  	this.getCats();
  }

  getCats() {
  	this.catService.getCategories().subscribe(cats => {
      this.cats = cats;
      this.catService.setCategories(cats);
    });

  }
}