import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ActivityComponent } from './activity/activity.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { DateselectComponent } from './dateselect/dateselect.component';
import { StatusmessageComponent} from './statusmessage/statusmessage.component';
import { EventComponent } from './event/event.component'
import {WaitmsgComponent} from './waitmsg/waitmsg.component'



const routes: Routes = [
{ path: 'event/:eid', component: EventComponent},
{ path: 'cats', component: CategoriesComponent},
{ path: 'category/:id', component: ActivityComponent},
{ path: 'category/:catId/activity/:actId', component: DateselectComponent},
{ path: 'category/:catId/activity/:actId/date/:date', component: TimeslotComponent},
// { path: 'category/:catId/activity/:actId/date/:date/slot/:slot', component: StatusmessageComponent}
{ path: 'wait_msg', component: WaitmsgComponent},
{ path: 'create_event_status', component: StatusmessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
