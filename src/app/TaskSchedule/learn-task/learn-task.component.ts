import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskScheduleService } from 'src/app/Services/task-schedule.service';

@Component({
  selector: 'app-learn-task',
  templateUrl: './learn-task.component.html',
  styleUrls: ['./learn-task.component.css']
})
export class LearnTaskComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  scheduleRecord: TaskSchedule;

  constructor(private activatedRoute: ActivatedRoute,
    private taskScheduleService: TaskScheduleService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.taskScheduleService.GetById(params.id).subscribe(
          dt => this.scheduleRecord = dt,
          err => {
            this.errorMessage = (err.error.message) ? err.error.message : err.message;
            this.error = true;
          }
        );
      }
    );
  }

}
