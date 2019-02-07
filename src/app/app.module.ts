import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




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
import { SigninComponent } from './signin/signin.component';
import { ErrorComponent } from './error/error.component';
import { GroupComponent } from './group/group.component';
import { GrouplistComponent } from './grouplist/grouplist.component';
import { CreategroupsuccessComponent } from './creategroupsuccess/creategroupsuccess.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


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
    EventlistComponent,
    SigninComponent,
    ErrorComponent,
    GroupComponent,
    GrouplistComponent,
    CreategroupsuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [apiProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
