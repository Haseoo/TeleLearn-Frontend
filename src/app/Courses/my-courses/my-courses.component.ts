import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

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
    const currentUser = this.userService.GetCurrentUser();
    let observaleBriefs: Observable<CourseBrief[]>;
    if (currentUser.userRole.toString() === UserRole[UserRole.STUDENT]) {
      observaleBriefs = this.courseService.GetMyCoursesForStudent(currentUser.id);
    } else if (currentUser.userRole.toString() === UserRole[UserRole.TEACHER]){
      observaleBriefs = this.courseService.GetMyCoursesForTeacher(currentUser.id);
    }
    observaleBriefs.subscribe(
      dt => {
        this.courseBriefs = dt;
        this.courseBriefs.sort(this._CourseCompare);
      }, err => {
        Utils.HandleError(err, this);
      }
    );
  }

  get ShowOwner(): boolean {
    return !(this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER]);
  }

  private _CourseCompare(course1: CourseBrief, course2: CourseBrief) {
    if (course1.name < course2.name) {
      return -1;
    }
    if (course1.name < course2.name) {
      return 1;
    }
    return 0;
  }

}
