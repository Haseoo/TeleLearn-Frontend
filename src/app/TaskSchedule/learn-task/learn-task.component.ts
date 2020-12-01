import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { Time } from 'src/app/Models/Time';
import { LearnTimerService } from 'src/app/Services/learn-timer.service';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-learn-task',
  templateUrl: './learn-task.component.html',
  styleUrls: ['./learn-task.component.css']
})
export class LearnTaskComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  showManualRecordFrom = false;

  scheduleRecord: TaskSchedule;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskScheduleService: TaskScheduleService,
              private taskService: TaskService,
              private userService: UserService,
              private learnTimerService: LearnTimerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this._FetchData(params.id);
      }
    );
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
                this._FetchData(this.scheduleRecord.id);
                this.showManualRecordFrom = false;
              }, err => {
                Utils.HandleError(this, err);
              }
            );
        }, err => {
          Utils.HandleError(this, err);
        }
      );
  }

  OnTimerOption() {
    if (this.learnTimerService.SetTimer(this.scheduleRecord.id)) {
      this.router.navigateByUrl('/timer');
    } else {
      Utils.HandleError(this, {error: {message: 'Czasomierz jest już ustawiony. Aby go uruchomić dla nowego zadania, zresetuj go w sekcji "czasomierz".'}});
    }
  }

  get TimeForForm(): Time {
    if (this.scheduleRecord.learningTime.hours + this.scheduleRecord.learningTime.minutes !== 0) {
      return this.scheduleRecord.learningTime;
    }
    return this.scheduleRecord.plannedTime;
  }

  private _FetchData(id: number) {
    this.taskScheduleService.GetById(id).subscribe(
      dt => {
        if (dt.task.isLearnable) {
          this.scheduleRecord = dt;
        } else {
          this.errorMessage = 'Aby wykonać to zadanie, należy ukończyć wszytskie zadania poprzedzające.';
          this.error = true;
        }
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

}
