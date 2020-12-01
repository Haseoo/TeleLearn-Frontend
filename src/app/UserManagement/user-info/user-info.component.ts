import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { Student } from 'src/app/Models/Student';
import { Teacher } from 'src/app/Models/Teacher';
import { User } from 'src/app/Models/User';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, IError {

  user: User;
  student: Student;
  teacher: Teacher;
  coursesBriefs: CourseBrief[];


  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private courseService: CourseService) { }
  error: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
        this.userService.getUser(params.id).subscribe(
          dt => {
            this.user = dt;
            if (this.user.userRole.toString() === UserRole[UserRole.STUDENT]) {
              this.userService.getStudent(this.user.id).subscribe (
                dt2 => this.student = dt2,
                err => {
                  Utils.HandleError(this, err);
                }
              );
            } else if (this.user.userRole.toString() === UserRole[UserRole.TEACHER]) {
              this.userService.getTeacher(this.user.id).subscribe (
                dt2 => {
                  this.teacher = dt2;
                  this.courseService.GetMyCoursesForTeacher(this.teacher.id).subscribe(
                    dt3 => this.coursesBriefs = dt3,
                    err => {
                      Utils.HandleError(this, err);
                    }
                  );
                }, err => {
                  Utils.HandleError(this, err);
                }
              );
            }
          }, err => {
            Utils.HandleError(this, err);
          }
        )
      );
  }

  OnMessageClick(userId: number) {
    this.router.navigateByUrl(`/messages/${userId}`);
  }

}
