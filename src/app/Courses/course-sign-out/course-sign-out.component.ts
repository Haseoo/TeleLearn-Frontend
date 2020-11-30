import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-course-sign-out',
  templateUrl: './course-sign-out.component.html',
  styleUrls: ['./course-sign-out.component.css']
})
export class CourseSignOutComponent implements OnInit {

  courseId: number;
  error: boolean;
  errorMessage: string;

  constructor(private router: Router,
              private actvatedRoute: ActivatedRoute,
              private userService: UserService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.actvatedRoute.parent.params.subscribe(
      params => this.courseId = params['course-id']
    );
  }

  OnSignOut() {
    this.courseService.SignOutStudent(this.courseId, this.userService.GetCurrentUser().id).subscribe(
      () => this.router.navigate(['/my-courses']),
      err => {
        Utils.HandleError(this, err);
      }
    );
  }

}
