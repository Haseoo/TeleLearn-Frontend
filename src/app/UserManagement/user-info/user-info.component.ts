import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { Student } from 'src/app/Models/Student';
import { Teacher } from 'src/app/Models/Teacher';
import { User } from 'src/app/Models/User';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
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
  coursesBriefs: CourseBrief[];


  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
        this.userService.getUser(params.id).subscribe(
          dt => {
            this.user = dt;
            if (this.user.userRole.toString() === UserRole[UserRole.STUDENT]) {
              this.userService.getStudent(this.user.id).subscribe (
                dt2 => this.student = dt2,
                err => {
                  this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
                  this.responseError = true;
                }
              );
            } else if (this.user.userRole.toString() === UserRole[UserRole.TEACHER]) {
              this.userService.getTeacher(this.user.id).subscribe (
                dt2 => {
                  this.teacher = dt2;
                  this.courseService.GetMyCoursesForTeacher(this.teacher.id).subscribe(
                    dt3 => this.coursesBriefs = dt3,
                    err => {
                      this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
                      this.responseError = true;
                    }
                  );
                }, err => {
                  this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
                  this.responseError = true;
                }
              );
            }
          }, err => {
            this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
            this.responseError = true;
          }
        )
      );
  }

  OnMessageClick(userId: number) {
    this.router.navigateByUrl(`/messages/${userId}`);
  }

}
