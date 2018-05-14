import { LogoutComponent       }   from './pages/logout/logout.component';
import {UserComponent} from "./pages/user/user.component";
import { AuthGuard } from './services/auth_guard.service';
import { PageNotFoundComponent }  from './pages/404/page-not-found.component';
import {PageAccessDeniedComponent} from "./pages/401/page-access-denied.component";
import {UserAddComponent} from "./pages/user/user-add.component";
import {UserEditComponent} from "./pages/user/user-edit.component";
import {ClientAddComponent} from "./pages/clients/client-add/client-add.component";
import {ClientsListComponent} from "./pages/clients/clients-list/clients-list.component";
import {ClientDetailsComponent} from "./pages/clients/client-details/client-details.component";
import {ClientDeleteComponent} from "./pages/clients/client-delete/client-delete.component";
import {ClientEditComponent} from "./pages/clients/client-edit/client-edit.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {ActivityDetailsComponent} from "./pages/clients/activity-details/activity-details.component";
import {UserDetailsComponent} from "./pages/user/user-details.component";
import {ClientImportComponent} from "./pages/clients/import/client-import.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {UserAccountComponent} from "./pages/user/account/user.account.component";
import {ThemeChangerComponent} from "./pages/user/account/theme-changer/theme.component";
import {ChangePasswordComponent} from "./pages/user/account/password-change/password.change.component";
import {ChangeEmailComponent} from "./pages/user/account/email-change/email.change.component";
import {PermissionsComponent} from "./pages/user/account/permissions/permissions.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {CalendarAddEventComponent} from "./pages/calendar/calendar-add-event/calendar-add-event.component";
import {CalendarEditEventComponent} from "./pages/calendar/calendar-edit-event/calendar-edit-event.component";
import {AmaEmailComponent} from "./pages/user/account/ama-email/ama-email.component";
import {UserStatisticsComponent} from "./pages/user/account/statistics/user.statistics.component";
import {ClientPipelineComponent} from "./pages/clients/client-pipeline/client.pipeline.component";
import {GroupsComponent} from "./pages/clients/groups/groups.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children:[
        { path: '', redirectTo: '/home', pathMatch: 'full', data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}] },
    ]
  },

  { path: 'dashboard',
    canActivate:[AuthGuard],
    component: DashboardComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'users',
    canActivate:[AuthGuard],
    component: UserComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },


  { path:'users/add',
    canActivate:[AuthGuard],
    component: UserAddComponent,
    data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}] },

  {
    path: 'users/:id',
    canActivate:[AuthGuard],
    component: UserDetailsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  {
    path: 'users/edit/:id',
    canActivate:[AuthGuard],
    component: UserEditComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'login' ,
    component: LoginComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },

  { path: 'forgot-password',
    component: ForgotPasswordComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'reset-password',
    component: ResetPasswordComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'logout',
    component: LogoutComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },

  { path: 'clients',
    canActivate:[AuthGuard],
    component: ClientsListComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'calendar',
    component: CalendarComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'groups',
    component: GroupsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'event/:id',
    component: CalendarAddEventComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'event/edit/:id',
    component: CalendarEditEventComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'clients/pipeline',
    canActivate:[AuthGuard],
    component: ClientPipelineComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'client/new',
    canActivate:[AuthGuard],
    component: ClientAddComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'client/:id',
    component: ClientDetailsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'client/delete/:id',
    canActivate:[AuthGuard],
    component: ClientDeleteComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'client/edit/:id',
    canActivate:[AuthGuard],
    component: ClientEditComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'client/activity/:id',
    canActivate:[AuthGuard],
    component: ActivityDetailsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },


  { path: 'user/:name',
    canActivate:[AuthGuard],
    component: UserAccountComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'permissions',
    canActivate:[AuthGuard],
    component: PermissionsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'ama-email',
    canActivate:[AuthGuard],
    component: AmaEmailComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'statistics',
    canActivate:[AuthGuard],
    component: UserStatisticsComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },


  { path: 'user/change-password/:id',
    canActivate:[AuthGuard],
    component: ChangePasswordComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'user/change-email/:id',
    canActivate:[AuthGuard],
    component: ChangeEmailComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'clients/import',
    canActivate:[AuthGuard],
    component: ClientImportComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: 'theme',
    canActivate:[AuthGuard],
    component: ThemeChangerComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]
  },

  { path: '**',
    redirectTo: '404',
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]},

    { path: '404',
      component: PageNotFoundComponent,
      data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },

  { path: '401',
    component: PageAccessDeniedComponent,
    data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}]},

];

@NgModule({
  exports: [ RouterModule ],
  declarations:[PageNotFoundComponent, PageAccessDeniedComponent],
  imports: [ RouterModule.forRoot(routes, {useHash:false} )],

})
export class AppRoutingModule {}

