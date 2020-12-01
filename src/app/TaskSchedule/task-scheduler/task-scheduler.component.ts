import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';
import { ScheduleTaskRequest } from 'src/app/Models/Requests/Courses/ScheduleTaskRequest';
import { Time } from 'src/app/Models/Time';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';
import { TaskToScheduleSection } from '../TaskToScheduleSection';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css', '../../../form-style.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TaskSchedulerComponent implements OnInit, IError {

  error: boolean;
  errorMessage: string;

  timeEdit = false;

  private _tasksToSchedule: Map<string, TaskToSchedule[]>;
  private _studentSchedule: Map<string, TaskSchedule[]>;

  private _currentScheduleDateValue: Date = new Date();
  private _currentTaskDateValue: Date = new Date();
  private _currentSection: TaskToScheduleSection = TaskToScheduleSection.TO_REPEAT;
  private _learningTimeForDay: Map<string, Time>;

  private _selectedTaskToSchedule: TaskToSchedule;
  private _selectedScheduledTask: TaskSchedule;

  dialogForm: FormGroup;

  constructor(private userService: UserService,
              private taskScheduleService: TaskScheduleService,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  ngOnInit(): void {
    this._FetchLearningTime();
    this._FetchSchedule();
    this._FetchTasksToSchedule();
    this.dialogForm = this.formBuilder.group({
      startTime: [this._currentTime],
      hours: [0, [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
    });
  }

  OpenModalSchedule(dialog: TemplateRef<any>, taskToSchedule: TaskToSchedule) {
    this._selectedTaskToSchedule = taskToSchedule;
    this.dialogForm.patchValue({
      startTime: this._currentTime,
      hours: taskToSchedule.task.learningTime.hours,
      minutes: taskToSchedule.task.learningTime.minutes
    });
    this.modalService.open(dialog);
  }

  OpenModalEditSchedule(dialog: TemplateRef<any>, taskSchedule: TaskSchedule) {
    this._selectedScheduledTask = taskSchedule;
    this.dialogForm.patchValue({
      startTime: taskSchedule.scheduleTime,
      hours: taskSchedule.plannedTime.hours,
      minutes: taskSchedule.plannedTime.minutes
    });
    this.modalService.open(dialog);
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
    this.userService.SetLearningTimeForStudent({ studentId: this.userService.GetCurrentUser().id, time: newTime, date: this.CurrentScheduleDate }).subscribe(
      dt => this._FetchLearningTime(),
      err => {
        Utils.HandleError(this, err);
      }
    );
  }

  OnScheduleDelete(schedule: TaskSchedule) {
    if (confirm('Operacja jest nieodwracalna! Kontynować?')) {
      this.taskScheduleService.DeleteSchedule(schedule.id).subscribe(
        dt => {
          this._FetchSchedule();
          this._FetchTasksToSchedule();
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnSubmit() {
    if (this.dialogForm.valid) {
      this.OnDialogApply(this.dialogForm.value);
    }
  }

  OnDialogApply(formData: any) {
    let observable: Observable<any>;
    if (this._selectedTaskToSchedule) {
      const request = new ScheduleTaskRequest();
      request.taskId = this._selectedTaskToSchedule.task.id;
      request.hours = formData.hours;
      request.minutes = formData.minutes;
      request.studentId = this.userService.GetCurrentUser().id;
      request.date = this.CurrentScheduleDate;
      request.startTime = formData.startTime;
      this._selectedTaskToSchedule = null;
      observable = this.taskScheduleService.Schedule(request);
    } else if (this._selectedScheduledTask) {
      const id = this._selectedScheduledTask.id;
      this._selectedScheduledTask.id = null;
      observable = this.taskScheduleService.UpdateSchedule(id, { hours: formData.hours, minutes: formData.minutes }, formData.startTime);
    }
    observable.subscribe(
      dt => {
        this._FetchSchedule();
        this._FetchTasksToSchedule();
      }, err => {
        Utils.HandleError(this, err, true);
      }
    );
  }

  get ctls() {
    return this.dialogForm.controls;
  }

  get CurrentScheduleDate(): string {
    return formatDate(this._currentScheduleDateValue, 'dd.MM.yyyy', 'PL');
  }

  get CurrentTaskToScheduleSection(): string {
    if (this._currentSection === TaskToScheduleSection.DATE) {
      return formatDate(this._currentTaskDateValue, 'dd.MM.yyyy', 'PL');
    }
    return this._currentSection;
  }

  get TodaysLearningTime(): Time {
    const value = this._learningTimeForDay[this.CurrentScheduleDate];
    if (value) {
      return value;
    } else {
      return this._learningTimeForDay['default'];
    }
  }

  get TodaysSchedule(): TaskSchedule[] {
    const schedule: [] = this._studentSchedule[this.CurrentScheduleDate];
    if (schedule) {
      schedule.sort(this._SortSchedule);
    }
    return (schedule) ? schedule : [];
  }

  get CurrentTaskToSchedule(): TaskToSchedule[] {
    const taskToSchedule = this._tasksToSchedule[this._TaskToSchedulePropertyName];
    if (taskToSchedule) {
      taskToSchedule.sort(this._SortTaskToSchedule);
    }
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
    const totalHours = Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes - totalHours * 60;
    return { hours: totalHours, minutes: totalMinutes };
  }

  get DialogTitle(): string {
    if (this._selectedTaskToSchedule) {
      return `Planowanie zadania: ${this._selectedTaskToSchedule.task.name}`;
    } else if (this._selectedScheduledTask) {
      return `Edycja planu zadania: ${this._selectedScheduledTask.task.name}`;
    }
    return '';
  }

  get DialogTime(): Time {
    if (this._selectedTaskToSchedule) {
      return this._selectedTaskToSchedule.task.learningTime;
    } else if (this._selectedScheduledTask) {
      return this._selectedScheduledTask.plannedTime;
    }
  }

  private get _currentTime(): string {
    return Utils.GetTimeString(new Date());
  }

  private get _TaskToSchedulePropertyName() {
    if (this._currentSection === TaskToScheduleSection.DELAYED) {
      return 'delayedTask';
    } else if (this._currentSection === TaskToScheduleSection.TO_REPEAT) {
      return 'taskToRepeat';
    } else if (this._currentSection === TaskToScheduleSection.DATE) {
      return formatDate(this._currentTaskDateValue, 'dd.MM.yyyy', 'PL');
    }
  }

  private _FetchLearningTime() {
    this.userService.GetLearningTimeForStudent(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._learningTimeForDay = dt;
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  private _FetchSchedule() {
    this.taskScheduleService.GetStudentSchedule(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._studentSchedule = dt;
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  private _FetchTasksToSchedule() {
    this.taskScheduleService.GetTaskToScheduleForStudent(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this._tasksToSchedule = dt;
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  private _SortTaskToSchedule(tts1: TaskToSchedule, tts2: TaskToSchedule): number {
    if (tts1.task.taskCompletion === tts2.task.taskCompletion) {
      if (tts2.totalPlannedLearningTime.hours === tts1.totalPlannedLearningTime.hours) {
        return tts1.totalPlannedLearningTime.minutes - tts2.totalPlannedLearningTime.minutes;
      }
      return tts1.totalPlannedLearningTime.hours - tts2.totalPlannedLearningTime.hours;
    }
    return tts1.task.taskCompletion - tts2.task.taskCompletion;
  }

  private _SortSchedule(ts1: TaskSchedule, ts2: TaskSchedule) {
    if (ts2.scheduleTime === null) {
      return 1;
    }
    else if (ts1.scheduleTime === null) {
      return -1;
    }
    if (ts1.scheduleTime < ts2.scheduleTime) {
      return -1;
    }
    if (ts1.scheduleTime > ts2.scheduleTime) {
      return 1;
    }
    return 0;
  }

}
