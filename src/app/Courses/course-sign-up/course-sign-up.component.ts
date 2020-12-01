import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-course-sign-up',
  templateUrl: './course-sign-up.component.html',
  styleUrls: ['./course-sign-up.component.css']
})
export class CourseSignUpComponent implements OnInit {

  error: boolean;
  errorMessage: string;
  waitMessage: boolean;
  course: CourseBrief;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.courseService.GetCourseBriefById(params['course-id']).subscribe(
        dt => this.course = dt,
        err => {
          Utils.HandleError(this, err);
        }
      );
    });
  }

  OnStudenSignIn() {
    this.courseService.SignInStudent(this.course.id, this.userService.GetCurrentUser().id).subscribe(
      dt => {
        if (dt.isAccepted) {
          this.router.navigate([`/course/${this.course.id}`]);
        } else{
          this.waitMessage = true;
        }
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

}
