import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { BannerComponent } from './MainPage/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsPagerComponent } from './MainPage/news-pager/news-pager.component';
import { NewsCardComponent } from './MainPage/news-card/news-card.component';
import { ErrorBarComponent } from './error-bar/error-bar.component';
import { UserNavComponent } from './UserManagement/user-nav/user-nav.component';
import { LoginComponent } from './UserManagement/login/login.component';
import { RegistrationComponent } from './UserManagement/registration/registration.component';
import { RegisterationTeacherComponent } from './UserManagement/registration/registeration-teacher/registeration-teacher.component';
import { RegisterationStudentComponent } from './UserManagement/registration/registeration-student/registeration-student.component';
import { JwtInterceptorService } from 'src/Auth/jwt-interceptor.service';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { LogoutComponent } from './UserManagement/logout/logout.component';
import { AuthErrorComponent } from './UserManagement/auth-error/auth-error.component';
import { SuccessBarComponent } from './success-bar/success-bar.component';
import { UserSettingsComponent } from './UserManagement/user-settings/user-settings.component';
import { UserInfoComponent } from './UserManagement/user-info/user-info.component';
import { NewsArticleComponent } from './GlobalNews/news-article/news-article.component';
import { NewsComposerComponent } from './GlobalNews/news-composer/news-composer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ConversationListComponent } from './Messages/conversation-list/conversation-list.component';
import { ConversationComponent } from './Messages/conversation/conversation.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MyCoursesComponent } from './Courses/my-courses/my-courses.component';
import { CourseComponent } from './Courses/course/course.component';
import { CoursesBriefComponent } from './Courses/courses-brief/courses-brief.component';
import { CourseMainPageComponent } from './Courses/course-main-page/course-main-page.component';
import { CourseFormComponent } from './Courses/course-form/course-form.component';
import { StudentListComponent } from './Courses/student-list/student-list.component';
import { CourseSignOutComponent } from './Courses/course-sign-out/course-sign-out.component';
import { CourseSignUpComponent } from './Courses/course-sign-up/course-sign-up.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { PostComposerComponent } from './Courses/Posts/post-composer/post-composer.component';
import { PostBoardComponent } from './Courses/Posts/post-board/post-board.component';
import { PostComponent } from './Courses/Posts/post/post.component';
import { PostPageComponent } from './Courses/Posts/post-page/post-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComposerComponent } from './Courses/Tasks/task-composer/task-composer.component';
import { TaskPageComponent } from './Courses/Tasks/task-page/task-page.component';
import { TaskComponent } from './Courses/Tasks/task/task.component';
import { CalendarComponent } from './Courses/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskUpdateComponent } from './Courses/Tasks/task-update/task-update.component';
import { PathsComponent } from './Courses/Tasks/paths/paths.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './Courses/Tasks/add-task/add-task.component';
import { ComposerComponent } from './Courses/Tasks/composer/composer.component';
import { TaskSchedulerComponent } from './TaskSchedule/task-scheduler/task-scheduler.component';
import { TaskToScheduleCardComponent } from './TaskSchedule/task-to-schedule-card/task-to-schedule-card.component';
import { ScheduledTaskCardComponent } from './TaskSchedule/scheduled-task-card/scheduled-task-card.component';
import { TimeInputFormComponent } from './TaskSchedule/time-input-form/time-input-form.component'
import localePL from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LearnComponent } from './TaskSchedule/learn/learn.component';
import { LearnTaskComponent } from './TaskSchedule/learn-task/learn-task.component';
import { UserStatsComponent } from './TaskSchedule/user-stats/user-stats.component';
import { RecordLearningComponent } from './TaskSchedule/record-learning/record-learning.component';
import { LearnTimerComponent } from './TaskSchedule/learn-timer/learn-timer.component';

registerLocaleData(localePL);

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  listPlugin,
  interactionPlugin,
  timeGridPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BannerComponent,
    NewsPagerComponent,
    NewsCardComponent,
    ErrorBarComponent,
    UserNavComponent,
    LoginComponent,
    RegistrationComponent,
    RegisterationTeacherComponent,
    RegisterationStudentComponent,
    InfoBarComponent,
    LogoutComponent,
    AuthErrorComponent,
    SuccessBarComponent,
    UserSettingsComponent,
    UserInfoComponent,
    NewsArticleComponent,
    NewsComposerComponent,
    SafeHtmlPipe,
    ConversationListComponent,
    ConversationComponent,
    MyCoursesComponent,
    CourseComponent,
    CoursesBriefComponent,
    CourseMainPageComponent,
    CourseFormComponent,
    StudentListComponent,
    CourseSignOutComponent,
    CourseSignUpComponent,
    TeacherListComponent,
    PostComposerComponent,
    PostBoardComponent,
    PostComponent,
    PostPageComponent,
    NotFoundComponent,
    TaskComposerComponent,
    TaskPageComponent,
    TaskComponent,
    CalendarComponent,
    TaskUpdateComponent,
    PathsComponent,
    AddTaskComponent,
    ComposerComponent,
    TaskSchedulerComponent,
    TaskToScheduleCardComponent,
    ScheduledTaskCardComponent,
    TimeInputFormComponent,
    LearnComponent,
    LearnTaskComponent,
    UserStatsComponent,
    RecordLearningComponent,
    LearnTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    LoadingBarModule,
    LoadingBarHttpClientModule,
    FullCalendarModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    NgbModule
     
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
              { provide: LOCALE_ID, useValue: 'PL' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
