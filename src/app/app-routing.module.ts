import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/Auth/auth-guard.service';
import { StudentGuardService } from 'src/Auth/student-guard.service';
import { TeacherGuardService } from 'src/Auth/teacher-guard.service';
import { UserGuardService } from 'src/Auth/user-guard.service';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { AuthErrorComponent } from './UserManagement/auth-error/auth-error.component';
import { LoginComponent } from './UserManagement/login/login.component';
import { LogoutComponent } from './UserManagement/logout/logout.component';
import { RegistrationComponent } from './UserManagement/registration/registration.component';
import { UserInfoComponent } from './UserManagement/user-info/user-info.component';
import { UserSettingsComponent } from './UserManagement/user-settings/user-settings.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'auth-error', component: AuthErrorComponent, canActivate: [AuthGuardService] },
  { path: 'user/settings', component: UserSettingsComponent, canActivate: [UserGuardService] },
  { path: 'user/:id', component: UserInfoComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
