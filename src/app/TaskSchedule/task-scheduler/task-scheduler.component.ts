import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskFroStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {

  ts: TaskToSchedule = new TaskToSchedule();
  t: TaskSchedule = new TaskSchedule();

  constructor() { }

  ngOnInit(): void {
    let task = new TaskFroStudent();
    task.name = "Testowa nazwa";
    task.learningTime = {hours: 1, minutes: 3};
    task.id = 1;
    task.courseId = 1;
    task.taskCompletion = 50;

    this.ts.task = task;
    this.ts.totalLearningTime = {hours: 8, minutes: 0};
    this.ts.totalPlannedLearningTime = {hours: 5, minutes: 45};

    this.t.task = task;
    this.t.date = new Date();
    this.t.id = 1;
    this.t.learningTime = {hours: 0, minutes:34};
    this.t.plannedTime = {hours: 1, minutes: 15};
  }

}
