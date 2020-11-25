import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskFroStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';
import { Time } from 'src/app/Models/Time';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.css']
})
export class TaskSchedulerComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
   
  }

  Foo(t: Time) {
    console.log(t);
  }

}
