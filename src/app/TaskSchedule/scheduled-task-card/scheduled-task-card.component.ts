import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() edit = new EventEmitter()
  @Output() remove = new EventEmitter()
  @Output() learn = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  GetTaskLink(): string {
    return `/course/${this.taskSchedule.task.courseId}/task/${this.taskSchedule.task.id}`;
  }

}
