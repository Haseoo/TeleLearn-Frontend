import { Component, OnInit } from '@angular/core';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { UserService } from 'src/app/Services/user.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  schedule: TaskSchedule[] = [];

  constructor(private userService: UserService,
              private taskScheduleService: TaskScheduleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskScheduleService.GetStudentSchedule(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        const schedule = dt[formatDate(new Date(), 'dd.MM.yyyy', 'PL')];
        if (schedule) {
          this.schedule = schedule;
          this.schedule.sort(this._SortSchedule);
        }
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  OnTaskLearn(tts: TaskSchedule) {
    this.router.navigate([`${tts.id}`], {relativeTo: this.activatedRoute});
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
