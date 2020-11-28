import { ThrowStmt } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  timeout = false;
  events: any[] = [];
  tasks: Task[];
  courseId: number;

  innerWidth: number;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    headerToolbar: {
      right: 'prev,next',
      left: 'title',
    },
    firstDay: 1,
    locale: 'PL',
    dayMaxEventRows: 1,
    height: 'auto'
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.calendarOptions.dayMaxEventRows = (this.innerWidth > 900) ? 1 : 0;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    setTimeout(() => this.timeout = true, 100);
    this.calendarOptions.dayMaxEventRows = (this.innerWidth > 900) ? 1 : 0;
    this.activatedRoute.parent.params.subscribe(
        params => {
          this.courseId = params['course-id'];
          this.taskService.GetCourseTasks(this.courseId).subscribe(
          dt => {
            this.tasks = dt;
            this._PrepareEvents();
          }, err => {
            this.errorMessage = (err.error.message) ? err.error.message : err.message;
          }
        );
      }
    );
  }

  private _PrepareEvents() {
    this.tasks.forEach(task => {
      this.events.push( { title: task.name, url: `/course/${task.courseId}/task/${task.id}`, date: task.dueDate, id: task.id } );
    });
  }


}
