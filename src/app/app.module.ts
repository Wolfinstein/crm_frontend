import { BrowserModule }    from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule    } from '@swimlane/ngx-charts';
import { ClarityModule      } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }       from './app.component';
import { HomeComponent         } from './pages/home/home.component';
import { LogoutComponent       } from './pages/logout/logout.component';
import { AppConfig        } from './app-config';
import { UserInfoService  } from './services/user-info.service';
import { AuthGuard        } from './services/auth_guard.service';
import { ApiRequestService} from './services/api/api-request.service';
import { LoginService     } from './services/api/login.service';
import {UserComponent} from "./pages/user/user.component";
import {UserService} from "./services/api/user.service";
import {NgxPaginationModule} from "ngx-pagination";
import {NgModule} from '@angular/core';
import {UserAddComponent} from "./pages/user/user-add.component";
import {MaterialModule} from "./modules/material.module";
import {HeaderComponent} from "./components/header/header.component";
import {UserEditComponent} from "./pages/user/user-edit.component";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {ClientsListComponent} from "./pages/clients/clients-list/clients-list.component";
import {ClientDetailsComponent} from "./pages/clients/client-details/client-details.component";
import {ClientEditComponent} from "./pages/clients/client-edit/client-edit.component";
import {ClientDeleteComponent} from "./pages/clients/client-delete/client-delete.component";
import {ClientAddComponent} from "./pages/clients/client-add/client-add.component";
import {ClientService} from "./services/api/client.service";
import {CdkTableModule} from "@angular/cdk/table";
import {UICarouselModule} from "ui-carousel";
import {TryItComponent} from "./components/try-it/try-it.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import localePL from '@angular/common/locales/pl';
import localePLExtra from '@angular/common/locales/extra/pl';
import {DatePipe, registerLocaleData} from "@angular/common";
import {UserDetailsComponent} from "./pages/user/user-details.component";
import { ActivityDetailsComponent } from './pages/clients/activity-details/activity-details.component';
import {ClientImportComponent} from "./pages/clients/import/client-import.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {HomeCarouselComponent} from "./components/home-carousel/carousel.component";
import {LoginComponent} from "./pages/login/login.component";
import {LoginHeaderComponent} from "./components/login-header/login-header.component";
import {ActivityService} from "./services/api/activity.service";
import {UserAccountComponent} from "./pages/user/account/user.account.component";
import {ThemeChangerComponent} from "./pages/user/account/theme-changer/theme.component";
import {ChangePasswordComponent} from "./pages/user/account/password-change/password.change.component";
import {ChangeEmailComponent} from "./pages/user/account/email-change/email.change.component";
import {PermissionsComponent} from "./pages/user/account/permissions/permissions.component";
import {OverlayModule} from '@angular/cdk/overlay';
import {DateTimePickerComponent} from "./pages/calendar/calendar-utils/date-time-picker.component";
import {CalendarHeaderComponent} from "./pages/calendar/calendar-utils/calendar-header.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {CalendarModule} from "angular-calendar";
import {CalendarService} from "./services/api/calendar.service";
import { CalendarAddEventComponent } from './pages/calendar/calendar-add-event/calendar-add-event.component';
import { CalendarEditEventComponent } from './pages/calendar/calendar-edit-event/calendar-edit-event.component';
import {
  NgbCollapseModule, NgbDatepickerModule, NgbModalModule, NgbModule,
  NgbTimepickerModule
} from "@ng-bootstrap/ng-bootstrap";
import {AmaEmailComponent} from "./pages/user/account/ama-email/ama-email.component";
import {UserStatisticsComponent} from "./pages/user/account/statistics/user.statistics.component";
import {DragulaModule} from "ng2-dragula";
import {ClientPipelineComponent} from "./pages/clients/client-pipeline/client.pipeline.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";
import {EditGroupDialog, GroupsComponent, NewGroupDialog} from "./pages/clients/groups/groups.component";
import { OrderDetailsComponent } from './pages/clients/order-details/order-details.component';
import { OrderAddComponent } from './pages/clients/order-add/order-add.component';
import { WareListComponent } from './pages/ware/ware-list/ware-list.component';
import {WareService} from "./services/api/ware.service";
import { OrderWareAddComponent } from './pages/clients/order-ware-add/order-ware-add.component';

registerLocaleData(localePL, 'pl', localePLExtra);

@NgModule({
  imports: [
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgxChartsModule,
    ClarityModule.forChild(),
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    CdkTableModule,
    FormsModule,
    UICarouselModule,
    NgbModule,
    NgbCollapseModule,
    OverlayModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    DragulaModule,
    Ng2SearchPipeModule,
    MultiselectDropdownModule
  ],

  entryComponents: [NewGroupDialog, EditGroupDialog],

  declarations: [
    UserEditComponent,
    HeaderComponent,
    UserComponent,
    UserAddComponent,
    SideNavComponent,
    AppComponent,
    ClientsListComponent,
    ClientDetailsComponent,
    ClientDeleteComponent,
    ClientEditComponent,
    ClientAddComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    TryItComponent,
    HomeCarouselComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserDetailsComponent,
    ResetPasswordComponent,
    ActivityDetailsComponent,
    ClientImportComponent,
    DashboardComponent,
    LoginHeaderComponent,
    UserAccountComponent,
    ThemeChangerComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    PermissionsComponent,
    LoginHeaderComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent,
    CalendarAddEventComponent,
    CalendarEditEventComponent,
    AmaEmailComponent,
    UserStatisticsComponent,
    ClientPipelineComponent,
    GroupsComponent,
    NewGroupDialog,
    EditGroupDialog,
    OrderDetailsComponent,
    OrderAddComponent,
    WareListComponent,
    OrderWareAddComponent
  ],
  providers:[
    AuthGuard,
    UserInfoService,
    ApiRequestService,
    LoginService,
    UserService,
    AppConfig,
    ClientService,
    ActivityService,
    DatePipe,
    ClientService,
    CalendarService,
    WareService
  ],

  bootstrap: [AppComponent]
})

export class AppModule
{

}
platformBrowserDynamic().bootstrapModule(AppModule);
