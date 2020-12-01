import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { CourseService } from 'src/app/Services/course.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  course: Course;

  error: boolean;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private courseService: CourseService) { }

    ngOnInit(): void {
      this.activatedRoute.parent.params.subscribe(
        params => {
          this.courseService.GetCourseById(params['course-id']).subscribe (
            dt => {
              this.course = dt;
            }, err => {
              Utils.HandleError(this, err);
            }
          );
        }
      );
    }
    OnSave(id: string) {
      this.router.navigate([`../${id}`], {relativeTo: this.activatedRoute});
    }

}
