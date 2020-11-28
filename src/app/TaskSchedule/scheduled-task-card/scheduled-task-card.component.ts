import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';

@Component({
  selector: 'app-scheduled-task-card',
  templateUrl: './scheduled-task-card.component.html',
  styleUrls: ['./scheduled-task-card.component.css']
})
export class ScheduledTaskCardComponent implements OnInit {

  @Input() buttons: string[] = [];
  @Input() onTaskPage = false;
  @Input() taskSchedule: TaskSchedule;

  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() learn = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  GetTaskLink(): string {
    return `/course/${this.taskSchedule.task.courseId}/task/${this.taskSchedule.task.id}`;
  }

  IsCompleted(): boolean {
    const scheduledTime = this.taskSchedule.plannedTime.hours * 60 + this.taskSchedule.plannedTime.minutes;
    const learningTime = this.taskSchedule.learningTime.hours * 60 + this.taskSchedule.learningTime.minutes;
    return learningTime >= scheduledTime || (this.taskSchedule.task.taskCompletion === 100 && !this.taskSchedule.task.isToRepeat);
  }

}
