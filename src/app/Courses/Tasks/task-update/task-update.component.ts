import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { CourseService } from 'src/app/Services/course.service';
import { TaskService } from 'src/app/Services/task.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task: Task;
  course: Course;

  error: boolean;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.taskService.GetById(params.id).subscribe (
          dt => {
            this.task = dt;
            this.courseService.GetCourseById(this.task.courseId).subscribe(
              dt2 => this.course = dt2,
              err => {
                Utils.HandleError(this, err);
              }
            );
          }, err => {
            Utils.HandleError(this, err);
          }
        );
      }
    );
  }

  OnSave() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
