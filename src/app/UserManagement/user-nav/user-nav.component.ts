import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Models/UserRole';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(public userService: UserService) { }

  @Output() linkClick = new EventEmitter<any>();

  ngOnInit(): void {
  }

  get isCurrentUserAdmin(): boolean {
    return this.userService.IsCurrentUserAdmin();
  }

  get isCurrentUserStudent(): boolean {
    return this.userService.IsCurrentUserStudent();
  }

  get isCurrentUserTeacher(): boolean {
    return this.userService.IsCurrentUserTeacher();
  }

}
