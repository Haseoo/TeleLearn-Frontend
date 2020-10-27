import { Component, OnInit } from '@angular/core';
import { APP_NAME } from './constants'
import { UserLoginResponse } from './Models/UserLoginResponse';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = APP_NAME;
  appName = APP_NAME;

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
  }

  get currentUser(): UserLoginResponse {
    return this.userService.GetCurrentUser();
  }
}