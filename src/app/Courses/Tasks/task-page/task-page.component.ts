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
import { Utils } from 'src/Utlis';

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
          this.task = null;
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnTaskEdit() {
    this.router.navigate(['update'], {relativeTo: this.activatedRoute});
  }

  OnTaskToRepeat(isToRepeat: boolean) {
    this.taskService.SetTaskToRepeat(this.task.id, {studentId: this.userService.GetCurrentUser().id, isToRepeat}).subscribe(
      dt => {
        this._FetchTask(this.task.id);
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  OnTaskProgressUpdate(progress: number) {
    this.taskService.SetTaskProgress(this.task.id, {studentId: this.userService.GetCurrentUser().id, progress}).subscribe(
      dt => {
        this._FetchTask(this.task.id);
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  get ShowManagement(): boolean {
    return this.userService.IsCurrentUserTeacher();
  }

  get ShowForStudent(): boolean {
    return this.userService.IsCurrentUserStudent();
  }

  private _FetchTask(id: number) {
    this.taskService.GetById(id).subscribe (
      dt => {
        this.task = dt;
        this.courseService.GetCourseById(this.task.courseId).subscribe(
          dt2 => this.course = dt2,
          err => {
            Utils.HandleError(this, err);
          }
        );
        if (this.ShowForStudent) {
          this.taskScheduleService.GetTaskSchedule(this.task.id).subscribe(
            dt2 => this.taskSchedule = dt2,
            err => {
              Utils.HandleError(this, err);
            }
          );
        }
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

}
