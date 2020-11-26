import { Component, OnInit } from '@angular/core';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';
import { UserService } from 'src/app/Services/user.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';

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
        let schedule = dt[formatDate(new Date(), 'dd.MM.yyyy', 'PL')];
        if(schedule) {
          this.schedule = schedule;
        }
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message: err.message;
      }
    );
  }

  OnTaskLearn(tts: TaskSchedule) {
    this.router.navigate([`${tts.id}`], {relativeTo: this.activatedRoute});
  }

}
