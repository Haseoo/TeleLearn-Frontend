import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from 'src/Auth/admin-guard.service';
import { AuthGuardService } from 'src/Auth/auth-guard.service';
import { StudentGuardService } from 'src/Auth/student-guard.service';
import { TeacherGuardService } from 'src/Auth/teacher-guard.service';
import { UserGuardService } from 'src/Auth/user-guard.service';
import { CourseComponent } from './Courses/course/course.component';
import { MyCoursesComponent } from './Courses/my-courses/my-courses.component';
import { NewsArticleComponent } from './GlobalNews/news-article/news-article.component';
import { NewsComposerComponent } from './GlobalNews/news-composer/news-composer.component';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { NewsPagerComponent } from './MainPage/news-pager/news-pager.component';
import { ConversationListComponent } from './Messages/conversation-list/conversation-list.component';
import { ConversationComponent } from './Messages/conversation/conversation.component';
import { AuthErrorComponent } from './UserManagement/auth-error/auth-error.component';
import { LoginComponent } from './UserManagement/login/login.component';
import { LogoutComponent } from './UserManagement/logout/logout.component';
import { RegistrationComponent } from './UserManagement/registration/registration.component';
import { UserInfoComponent } from './UserManagement/user-info/user-info.component';
import { UserSettingsComponent } from './UserManagement/user-settings/user-settings.component';


const routes: Routes = [
  { path: '', component: MainPageComponent, children: [
    { path: '', component: NewsPagerComponent },
    { path: 'news/compose', component: NewsComposerComponent, canActivate: [AdminGuardService] },
    { path: 'news/compose/:id', component: NewsComposerComponent, canActivate: [AdminGuardService] },
    { path: 'news/:id', component: NewsArticleComponent },
    { path: 'user/settings', component: UserSettingsComponent, canActivate: [UserGuardService] },
    { path: 'user/:id', component: UserInfoComponent, canActivate: [AuthGuardService] },
    { path: 'messages', component: ConversationListComponent, canActivate: [AuthGuardService] },
    { path: 'messages/:id', component: ConversationComponent, canActivate: [AuthGuardService] },
    { path: 'my-courses', component: MyCoursesComponent, canActivate: [UserGuardService] }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'auth-error', component: AuthErrorComponent, canActivate: [AuthGuardService] },
  { path: 'course/:id', component: CourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
