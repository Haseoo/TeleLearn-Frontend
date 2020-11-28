import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { LearnTimerView } from 'src/app/Models/LearnTimer/LearnTimerView';
import { TimerState } from 'src/app/Models/LearnTimer/TimerState';
import { Time } from 'src/app/Models/Time';
import { LearnTimerService } from 'src/app/Services/learn-timer.service';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';
import { TimeView } from './TimeView';

@Component({
  selector: 'app-learn-timer',
  templateUrl: './learn-timer.component.html',
  styleUrls: ['./learn-timer.component.css']
})
export class LearnTimerComponent implements OnInit, OnDestroy, IError {

  constructor(private learnTimerService: LearnTimerService,
              private taskScheduleService: TaskScheduleService,
              private taskService: TaskService,
              private userService: UserService,
              private router: Router) { }

  error: boolean;
  errorMessage: string;

  currentTime: TimeView;
  timer: LearnTimerView;
  interval: any;
  scheduleRecord: TaskSchedule;

  saveTimer: boolean;


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.interval = setInterval(() => this._UpdateTimer(), 1000);
    this._UpdateTimer();
    if (this.timer) {
      this._FetchSchedule(this.timer.scheduleId);
    }
  }

  OnPause() {
    this.learnTimerService.PauseTimer();
    this._UpdateTimer();
  }

  OnResume() {
    this.learnTimerService.ResumeTimer();
    this._UpdateTimer();
  }

  OnStop() {
    this.learnTimerService.stopTimer();
    this._UpdateTimer();
    clearInterval(this.interval);
  }

  OnSave() {
    this._UpdateTimer();
    this.saveTimer = true;
  }

  OnDelete() {
    this.learnTimerService.RemoveTimer();
    this._UpdateTimer();
    this.scheduleRecord = null;
  }

  OnLearnRecord(request: any) {
    this.taskScheduleService.UpdateLearningTime(
      this.scheduleRecord.id,
      request.startTime.toString(),
      { hours: request.hours, minutes: request.minutes }).subscribe(
        () => {
          this.taskService.SetTaskProgress(this.scheduleRecord.task.id,
            { studentId: this.userService.GetCurrentUser().id, progress: request.progress }).subscribe(
              () => {
                this.learnTimerService.RemoveTimer();
                this.router.navigateByUrl(`/learn/${this.scheduleRecord.id}`);
              }, err => Utils.HandleError(this, err)
            );
        }, err => Utils.HandleError(this, err)
      );
  }

  get TimeForForm(): Time {
    return {hours: this.currentTime.hours, minutes: this.currentTime.minutes};
  }

  get isPaused(): boolean {
    return this.timer.state === TimerState.PAUSED;
  }

  get isStopped(): boolean {
    return this.timer.state === TimerState.STOPPED;
  }

  get isRunning(): boolean {
    return this.timer.state === TimerState.RUNNING;
  }

  get startTime(): string {
    return Utils.GetTimeString(new Date(this.timer.start));
  }

  private _UpdateTimer() {
    this.timer = this.learnTimerService.getTimer();
    if (!this.timer) {
      clearInterval(this.interval);
      this._NoScheduleError();
      return;
    }
    this.currentTime = new TimeView(this.timer.value);
  }

  private _FetchSchedule(id: number) {
    this.taskScheduleService.GetById(id).subscribe(
      dt => this.scheduleRecord = dt,
      err => Utils.HandleError(this, err)
    );
  }

  private _NoScheduleError() {
    Utils.HandleError(this, {error: {message: 'Nie ustawiono czasomierza. Przejdź do sekcji "ucz się" następnie wybierz zadanie i opcję nauki z czasomierzem.'}});
  }

}
