import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  error: boolean;
  errorMessage: string;
  course: Course;

  menuVisible: boolean = false;
  innerWidth: number;

  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.activatedRoute.params.subscribe(
      params => {
        let courseId = params['course-id'];
        if (!courseId) {
          this.errorMessage = 'Nie podano id kursu';
          this.error = true;
        } else {
          this.courseService.GetCourseById(courseId).subscribe (
            dt => {
              this.course = dt;
            }, err => {
              if (err.status === 403) {
                this.router.navigate(['/sign-up-course/' + courseId]);
              }
              this.errorMessage = (err.error.message) ? err.error.message : err.message;
              this.error = true;
            }
          )
        }
      }
    )
  }

  IsCurrentUserTeacher(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER];
  }

  IsCurrentUserStudent(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
