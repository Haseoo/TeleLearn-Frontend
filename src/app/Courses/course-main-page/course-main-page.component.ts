import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-course-main-page',
  templateUrl: './course-main-page.component.html',
  styleUrls: ['./course-main-page.component.css']
})
export class CourseMainPageComponent implements OnInit {

  course: Course;

  constructor(private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.courseService.GetCourseById(params['course-id']).subscribe (
          dt => this.course = dt
        );
      }
    );
  }

}
