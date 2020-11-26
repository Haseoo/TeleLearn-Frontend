import { Component, Input, OnInit } from '@angular/core';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';

@Component({
  selector: 'app-scheduled-task-card',
  templateUrl: './scheduled-task-card.component.html',
  styleUrls: ['./scheduled-task-card.component.css']
})
export class ScheduledTaskCardComponent implements OnInit {

  @Input() buttons: string[] = [];
  @Input() onTaskPage: boolean = false;
  @Input() taskSchedule: TaskSchedule;
  @Input() selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.taskSchedule);
  }

  GetTaskLink(): string {
    return `/course/${this.taskSchedule.task.courseId}/task/${this.taskSchedule.task.id}`;
  }

}
