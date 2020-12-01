import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  error: boolean;
  errorMessage: string;
  course: Course;

  menuVisible = false;
  innerWidth: number;

  breakPoint = environment.break_point;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.activatedRoute.params.subscribe(
      params => {
        const courseId = params['course-id'];
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
              Utils.HandleError(this, err);
            }
          );
        }
      }
    );
  }

  IsCurrentUserTeacher(): boolean {
    return this.userService.IsCurrentUserTeacher();
  }

  IsCurrentUserStudent(): boolean {
    return this.userService.IsCurrentUserStudent();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
