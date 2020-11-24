import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
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
  taskSchedule: TaskSchedule[];

  error: boolean;
  errorMessage: string;
  deleteSucces: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private taskScheduleService: TaskScheduleService,
    private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this._FetchTask(params.id);
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

  OnTaskToRepeat(isToRepeat: boolean) {
    this.taskService.SetTaskToRepeat(this.task.id, {studentId: this.userService.GetCurrentUser().id, isToRepeat: isToRepeat}).subscribe(
      dt => {
        this._FetchTask(this.task.id);
      },err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    )

  }

  get ShowManagement(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER];
  }

  get ShowForStudent(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT];
  }

  private _FetchTask(id: number) {
    this.taskService.GetById(id).subscribe (
      dt => {
        this.task = dt;        
        this.courseService.GetCourseById(this.task.courseId).subscribe(
          dt => this.course = dt,
          err => {
            this.errorMessage = (err.error.message) ? err.error.message : err.message;
            this.error = true;
          }
        );
        if(this.ShowForStudent) {
          this.taskScheduleService.GetTaskSchedule(this.task.id).subscribe(
            dt => this.taskSchedule = dt,
            err => {
              this.errorMessage = (err.error.message) ? err.error.message : err.message;
              this.error = true;
            }
          )
        }
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

}
