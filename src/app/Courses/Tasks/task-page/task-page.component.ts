import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  task: Task;
  course: Course;

  error: boolean;
  errorMessage: string;
  deleteSucces: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.taskService.GetById(params.id).subscribe (
          dt => {
            this.task = dt;
            this.courseService.GetCourseById(this.task.courseId).subscribe(
              dt => this.course = dt,
              err => {
                this.errorMessage = (err.error.message) ? err.error.message : err.message;
                this.error = true;
              }
            )
          }, err => {
            this.errorMessage = (err.error.message) ? err.error.message : err.message;
            this.error = true;
          }
        );
      }
    );
  }

  OnTaskDelete() {
    if (confirm('Operacja jest nieodwracalna! Kontynuować?')) {
      this.taskService.DeleteTask(this.task.id).subscribe(
        dt => {
          this.deleteSucces = true;
          this.task= null;
        }, err => {
          this.errorMessage = (err.error.message) ? err.error.message : err.message;
          this.error = true;
        }
      )
    }
  }

  OnTaskEdit() {
    this.router.navigate(['update'], {relativeTo: this.activatedRoute});    
  }

  get ShowManagement(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER];
  }

}