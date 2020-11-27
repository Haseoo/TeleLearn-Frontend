import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { Time } from 'src/app/Models/Time';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-learn-task',
  templateUrl: './learn-task.component.html',
  styleUrls: ['./learn-task.component.css']
})
export class LearnTaskComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  showManualRecordFrom: boolean = false;

  scheduleRecord: TaskSchedule;

  constructor(private activatedRoute: ActivatedRoute,
    private taskScheduleService: TaskScheduleService,
    private taskService: TaskService,
    private userService: UserService) { }

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
        dt => {
          this.taskService.SetTaskProgress(this.scheduleRecord.task.id,
            { studentId: this.userService.GetCurrentUser().id, progress: request.progress }).subscribe(
              dt => {
                this._FetchData(this.scheduleRecord.id);
                this.showManualRecordFrom = false;
              }, err => {
                this.errorMessage = (err.error.message) ? err.error.message : err.message;
                this.error = true;
              }
            );
        }, err => {
          this.errorMessage = (err.error.message) ? err.error.message : err.message;
          this.error = true;
        }
      );
  }

  get TimeForForm(): Time {
    if (this.scheduleRecord.learningTime.hours + this.scheduleRecord.learningTime.minutes != 0) {
      return this.scheduleRecord.learningTime;
    }
    return this.scheduleRecord.plannedTime;
  }

  private _FetchData(id: number) {
    this.taskScheduleService.GetById(id).subscribe(
      dt => this.scheduleRecord = dt,
      err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
  }

}
