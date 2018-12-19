import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ActivityComponent } from './activity/activity.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { DateselectComponent } from './dateselect/dateselect.component';
import { StatusmessageComponent } from './statusmessage/statusmessage.component';
import { EventComponent } from './event/event.component';
import { WaitmsgComponent } from './waitmsg/waitmsg.component';
import { DescriptionComponent } from './description/description.component';
import { NewparticipantComponent } from './newparticipant/newparticipant.component';
import { EventrejectmessageComponent } from './eventrejectmessage/eventrejectmessage.component';
import { EventlistComponent } from './eventlist/eventlist.component';





const routes: Routes = [
{ path: 'event/:eid', component: EventComponent},
{ path: 'cats', component: CategoriesComponent},
{ path: 'category/:id', component: ActivityComponent},
{ path: 'category/:catId/activity/:actId', component: DescriptionComponent},
{ path: 'category/:catId/activity/:actId/desc/:desc', component: DateselectComponent},
{ path: 'category/:catId/activity/:actId/desc/:desc/date/:date', component: TimeslotComponent},
// { path: 'category/:catId/activity/:actId/date/:date/slot/:slot', component: StatusmessageComponent}
{ path: 'wait_msg', component: WaitmsgComponent},
{ path: 'event_joined_success', component: NewparticipantComponent},
{ path: 'create_event_status', component: StatusmessageComponent},
{ path: 'event_reject_success', component: EventrejectmessageComponent},
{ path: 'eventlist', component: EventlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
