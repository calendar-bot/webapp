import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ActivityComponent } from './activity/activity.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { DateselectComponent } from './dateselect/dateselect.component';
import { StatusmessageComponent} from './statusmessage/statusmessage.component';




const routes: Routes = [
{ path: 'cats', component: CategoriesComponent},
{ path: 'category/:id', component: ActivityComponent},
{ path: 'category/:catId/activity/:actId', component: DateselectComponent},
{ path: 'category/:catId/activity/:actId/date/:date', component: TimeslotComponent},
{ path: 'category/:catId/activity/:actId/date/:date/slot/:slot', component: StatusmessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
