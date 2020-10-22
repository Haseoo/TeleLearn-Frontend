import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { BannerComponent } from './MainPage/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { NewsPagerComponent } from './MainPage/news-pager/news-pager.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BannerComponent,
    NewsPagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
