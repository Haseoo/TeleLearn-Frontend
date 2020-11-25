import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskToSchedule } from 'src/app/Models/Courses/Tasks/TaskToSchedule';

@Component({
  selector: 'app-task-to-schedule-card',
  templateUrl: './task-to-schedule-card.component.html',
  styleUrls: ['./task-to-schedule-card.component.css']
})
export class TaskToScheduleCardComponent implements OnInit {

  @Input() taskToSchedule: TaskToSchedule;
  @Input() selected: boolean = false;

  showDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  OnTaskClick() {
    this.showDetails = !this.showDetails;
  }

  GetTaskLink(): string {
    return `/course/${this.taskToSchedule.task.courseId}/task/${this.taskToSchedule.task.id}`;
  }

  CheckLearningTime() {
    let total = this.taskToSchedule.totalLearningTime.hours * 60 + this.taskToSchedule.totalLearningTime.minutes;
    let prop = this.taskToSchedule.task.learningTime.hours * 60 + this.taskToSchedule.task.learningTime.minutes;
    return prop < total;
  }

}
