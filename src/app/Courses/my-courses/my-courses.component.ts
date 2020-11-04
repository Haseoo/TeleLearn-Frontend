import { Component, OnInit } from '@angular/core';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  courseBriefs: CourseBrief[] = [];

  constructor(private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit(): void {
    let currentUser = this.userService.GetCurrentUser();
    let observaleBriefs;
    if (currentUser.userRole.toString() === UserRole[UserRole.STUDENT]) {
      observaleBriefs = this.courseService.GetMyCoursesForStudent(currentUser.id);
    } else if (currentUser.userRole.toString() === UserRole[UserRole.TEACHER]){
      observaleBriefs = this.courseService.GetMyCoursesForTeacher(currentUser.id);
    }
    observaleBriefs.subscribe(
      dt => {
        this.courseBriefs = dt;
      }, err => {
        this.error = true;
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
      }
    )
  }

  get ShowOwner(): boolean {
    return !(this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER]);
  }

}
