import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


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
    WaitmsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [apiProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
