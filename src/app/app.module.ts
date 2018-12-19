import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ActivityComponent } from './activity/activity.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { DateselectComponent } from './dateselect/dateselect.component';
import { StatusmessageComponent } from './statusmessage/statusmessage.component';

import { ActivityService } from './activity.service';
import {environment} from '../environments/environment';
import { MockActivityService } from './mock-activity.service';
import { EventComponent } from './event/event.component';
import { WaitmsgComponent } from './waitmsg/waitmsg.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DescriptionComponent } from './description/description.component';
import { NewparticipantComponent } from './newparticipant/newparticipant.component';
import { EventrejectmessageComponent } from './eventrejectmessage/eventrejectmessage.component';
import { EventlistComponent } from './eventlist/eventlist.component';

const apiProvider = {
  provide: ActivityService,
  useClass: environment.local ? MockActivityService : ActivityService
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    ActivityComponent,
    TimeslotComponent,
    DateselectComponent,
    StatusmessageComponent,
    EventComponent,
    WaitmsgComponent,
    DescriptionComponent,
    NewparticipantComponent,
    EventrejectmessageComponent,
    EventlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule
  ],
  providers: [apiProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
