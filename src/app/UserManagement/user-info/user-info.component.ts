import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/Models/Student';
import { Teacher } from 'src/app/Models/Teacher';
import { User } from 'src/app/Models/User';
import { UserRole } from 'src/app/Models/UserRole';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;
  student: Student;
  teacher: Teacher;
  responseError: boolean;
  responseErrorMessage: string;

  backUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => this.backUrl = params.backUrl);
    this.activatedRoute.params.subscribe(params =>
        this.userService.getUser(params.id).subscribe(
          dt => {
            this.user = dt;
            if (this.user.userRole.toString() === UserRole[UserRole.STUDENT]) {
              this.userService.getStudent(this.user.id).subscribe (
                dt => this.student = dt,
                err => {
                  this.responseErrorMessage = err.error.message;
                  this.responseError = true;
                }
              )
            } else if (this.user.userRole.toString() === UserRole[UserRole.TEACHER]) {
              this.userService.getTeacher(this.user.id).subscribe (
                dt => this.teacher = dt,
                err => {
                  this.responseErrorMessage = err.error.message;
                  this.responseError = true;
                }
              )
            }
          }, err => {
            this.responseErrorMessage = err.error.message;
            this.responseError = true;
          }
        )
      );
  }

  OnBack() {
    this.router.navigate([this.backUrl]);
  }

}
