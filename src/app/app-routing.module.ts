import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from 'src/Auth/admin-guard.service';
import { AuthGuardService } from 'src/Auth/auth-guard.service';
import { StudentGuardService } from 'src/Auth/student-guard.service';
import { TeacherGuardService } from 'src/Auth/teacher-guard.service';
import { UserGuardService } from 'src/Auth/user-guard.service';
import { CourseFormComponent } from './Courses/course-form/course-form.component';
import { CourseMainPageComponent } from './Courses/course-main-page/course-main-page.component';
import { CourseSignOutComponent } from './Courses/course-sign-out/course-sign-out.component';
import { CourseSignUpComponent } from './Courses/course-sign-up/course-sign-up.component';
import { CourseComponent } from './Courses/course/course.component';
import { MyCoursesComponent } from './Courses/my-courses/my-courses.component';
import { PostComposerComponent } from './Courses/Posts/post-composer/post-composer.component';
import { PostBoardComponent } from './Courses/Posts/post-board/post-board.component';
import { StudentListComponent } from './Courses/student-list/student-list.component';
import { NewsArticleComponent } from './GlobalNews/news-article/news-article.component';
import { NewsComposerComponent } from './GlobalNews/news-composer/news-composer.component';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { NewsPagerComponent } from './MainPage/news-pager/news-pager.component';
import { ConversationListComponent } from './Messages/conversation-list/conversation-list.component';
import { ConversationComponent } from './Messages/conversation/conversation.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AuthErrorComponent } from './UserManagement/auth-error/auth-error.component';
import { LoginComponent } from './UserManagement/login/login.component';
import { LogoutComponent } from './UserManagement/logout/logout.component';
import { RegistrationComponent } from './UserManagement/registration/registration.component';
import { UserInfoComponent } from './UserManagement/user-info/user-info.component';
import { UserSettingsComponent } from './UserManagement/user-settings/user-settings.component';
import { PostPageComponent } from './Courses/Posts/post-page/post-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskPageComponent } from './Courses/Tasks/task-page/task-page.component';
import { CalendarComponent } from './Courses/calendar/calendar.component';
import { TaskUpdateComponent } from './Courses/Tasks/task-update/task-update.component';
import { PathsComponent } from './Courses/Tasks/paths/paths.component';
import { AddTaskComponent } from './Courses/Tasks/add-task/add-task.component';
import { ComposerComponent } from './Courses/Tasks/composer/composer.component';
import { TaskSchedulerComponent } from './TaskSchedule/task-scheduler/task-scheduler.component';
import { LearnComponent } from './TaskSchedule/learn/learn.component';
import { LearnTaskComponent } from './TaskSchedule/learn-task/learn-task.component';
import { UserStatsComponent } from './TaskSchedule/user-stats/user-stats.component';
import { LearnTimerComponent } from './TaskSchedule/learn-timer/learn-timer.component';


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
    { path: 'my-courses', component: MyCoursesComponent, canActivate: [UserGuardService] },
    { path: 'new-course', component: CourseFormComponent, canActivate: [TeacherGuardService] },
    { path: 'sign-up-course/:course-id', component: CourseSignUpComponent, canActivate: [StudentGuardService] },
    { path: 'teachers', component: TeacherListComponent, canActivate: [AuthGuardService] },
    { path: 'my-schedule', component: TaskSchedulerComponent, canActivate: [StudentGuardService] },
    { path: 'learn', component: LearnComponent, canActivate: [StudentGuardService] },
    { path: 'learn/:id', component: LearnTaskComponent, canActivate: [StudentGuardService] },
    { path: 'stats', component: UserStatsComponent, canActivate: [StudentGuardService] },
    { path: 'timer', component: LearnTimerComponent, canActivate: [StudentGuardService] }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'auth-error', component: AuthErrorComponent, canActivate: [AuthGuardService] },
  { path: 'course/:course-id', component: CourseComponent, children: [
    { path: '', component: CourseMainPageComponent, canActivate: [UserGuardService]},
    { path: 'update', component: CourseFormComponent, canActivate: [TeacherGuardService] },
    { path: 'participants', component: StudentListComponent, canActivate: [UserGuardService] },
    { path: 'sign-out', component: CourseSignOutComponent, canActivate: [StudentGuardService] },
    { path: 'post/add', component: PostComposerComponent, canActivate: [UserGuardService] },
    { path: 'post/edit/:id', component: PostComposerComponent, canActivate: [UserGuardService] },
    { path: 'board', component: PostBoardComponent, canActivate: [UserGuardService] },
    { path: 'post/:id', component: PostPageComponent, canActivate: [UserGuardService] },
    { path: 'task/add', component: AddTaskComponent, canActivate: [TeacherGuardService] },
    { path: 'task/:id', component: TaskPageComponent, canActivate: [UserGuardService] },
    { path: 'task/:id/update', component: TaskUpdateComponent, canActivate: [TeacherGuardService] },
    { path: 'calendar', component: CalendarComponent, canActivate: [UserGuardService] },
    { path: 'paths', component: PathsComponent, canActivate: [UserGuardService] },
    { path: 'composer', component: ComposerComponent, canActivate: [TeacherGuardService] }
  ] },


  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
