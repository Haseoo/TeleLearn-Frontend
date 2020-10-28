import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Models/UserRole';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  isCurrentUserAdmin(): boolean {
    return this.checkUserRole(UserRole.ADMIN);
  }

  isCurrentUserStudent(): boolean {
    return this.checkUserRole(UserRole.STUDENT);
  }

  isCurrentUserTeacher(): boolean {
    return this.checkUserRole(UserRole.TEACHER);
  }

  private checkUserRole(role: UserRole): boolean {
    return this.userService.GetCurrentUser() && this.userService.GetCurrentUser().userRole.toString() === UserRole[role]
  }

  GetBackUrlParam(): string {
    return `?backUrl=${this.router.url}`;
  }

}
