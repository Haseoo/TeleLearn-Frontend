import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill'

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
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
