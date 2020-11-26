import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskFroStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';
import { Time } from 'src/app/Models/Time';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { UserService } from 'src/app/Services/user.service';
import { TaskToScheduleSection } from '../TaskToScheduleSection';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  timeEdit: boolean = false;

  private _tasksToSchedule: Map<string, TaskToSchedule[]>;
  private _studentSchedule: Map<string, TaskSchedule[]>;

  private _currentScheduleDateValue: Date = new Date();
  private _currentTaskDateValue: Date = new Date();
  private _currentSection: TaskToScheduleSection = TaskToScheduleSection.TO_REPEAT;
  private _learningTimeForDay: Map<string, Time>;

  constructor(private userService: UserService,
    private taskScheduleService: TaskScheduleService) { }

  ngOnInit(): void {
    this._FetchLearningTime();
    this._FetchSchedule();
    this._FetchTasksToSchedule();
  }

  OnNextScheduleDay() {
    this._currentScheduleDateValue.setDate(this._currentScheduleDateValue.getDate() + 1);
  }

  OnPrevScheduleDay() {
    if (this._currentScheduleDateValue > new Date()) {
      this._currentScheduleDateValue.setDate(this._currentScheduleDateValue.getDate() + - 1);
    }
  }

  IsScheduleFirstPage() {
    return this._currentScheduleDateValue <= new Date();
  }

  OnNextTaskToSchedule() {
    if (this._currentSection === TaskToScheduleSection.TO_REPEAT) {
      this._currentSection = TaskToScheduleSection.DELAYED;
    } else if (this._currentSection === TaskToScheduleSection.DELAYED) {
      this._currentSection = TaskToScheduleSection.DATE;
    } else if (this._currentSection === TaskToScheduleSection.DATE) {
      this._currentTaskDateValue.setDate(this._currentTaskDateValue.getDate() + 1);
    }
  }

  OnPrevTaskToSchedule() {
    if (this._currentSection === TaskToScheduleSection.DELAYED) {
      this._currentSection = TaskToScheduleSection.TO_REPEAT;
    } else if (this._currentSection === TaskToScheduleSection.DATE) {
      if (this._currentTaskDateValue > new Date()) {
        this._currentTaskDateValue.setDate(this._currentTaskDateValue.getDate() - 1);
      } else {
        this._currentSection = TaskToScheduleSection.DELAYED;
      }
    }
  }

  IsTaskToScheduleForstPage(): boolean {
    return this._currentSection === TaskToScheduleSection.TO_REPEAT;
  }

  IsTimeOverflow(): boolean {
    return this.TotalScheduledTime.hours * 60 + this.TotalScheduledTime.minutes > this.TodaysLearningTime.hours * 60 + this.TodaysLearningTime.minutes;
  }

  ShowDate(): boolean {
    return this._currentSection === TaskToScheduleSection.DELAYED;
  }

  OnTimeUpdate(newTime: Time) {
    this.timeEdit = false;
    this.userService.SetLearningTimeForStudent({studentId: this.userService.GetCurrentUser().id, time: newTime, date: this.CurrentScheduleDate}).subscribe(
      dt => this._FetchLearningTime(),
      err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

  OnTaskScheudle() {
  }

  get CurrentScheduleDate(): string {
    return formatDate(this._currentScheduleDateValue, "dd.MM.yyyy", "PL");
  }

  get CurrentTaskToScheduleSection(): string {
    if (this._currentSection === TaskToScheduleSection.DATE) {
      return formatDate(this._currentTaskDateValue, "dd.MM.yyyy", "PL");
    }
    return this._currentSection;
  }

  get TodaysLearningTime(): Time {
    let value = this._learningTimeForDay[this.CurrentScheduleDate];
    if (value) {
      return value;
    } else {
      return this._learningTimeForDay['default'];
    }
  }

  get TodaysSchedule(): TaskSchedule[] {
    let schedule = this._studentSchedule[this.CurrentScheduleDate];
    return (schedule) ? schedule : [];
  }

  get CurrentTaskToSchedule(): TaskToSchedule[] {
    let taskToSchedule = this._tasksToSchedule[this._TaskToSchedulePropertyName];
    return (taskToSchedule) ? taskToSchedule : [];
  }

  get Display(): boolean {
    if (this._learningTimeForDay && this._studentSchedule && this._tasksToSchedule) {
      return true;
    }
    return false;
  }

  get TotalScheduledTime(): Time {
    let totalMinutes = 0;
    this.TodaysSchedule.forEach(e => totalMinutes = totalMinutes + e.plannedTime.hours * 60 + e.plannedTime.minutes);
    let totalHours = Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes - totalHours * 60;
    return {hours: totalHours, minutes: totalMinutes};
  }

  private get _TaskToSchedulePropertyName() {
    if (this._currentSection == TaskToScheduleSection.DELAYED) {
      return "delayedTask";
    } else if (this._currentSection == TaskToScheduleSection.TO_REPEAT) {
      return "taskToRepeat";
    } else if (this._currentSection == TaskToScheduleSection.DATE) {
      return formatDate(this._currentTaskDateValue, "dd.MM.yyyy", "PL");
    }
  }

  private _FetchLearningTime() {
    this.userService.GetLearningTimeForStudent(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._learningTimeForDay = dt;
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

  private _FetchSchedule() {
    this.taskScheduleService.GetStudentSchedule(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._studentSchedule = dt;
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

  private _FetchTasksToSchedule() {
    this.taskScheduleService.GetTaskToScheduleForStudent(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._tasksToSchedule = dt;
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

}
