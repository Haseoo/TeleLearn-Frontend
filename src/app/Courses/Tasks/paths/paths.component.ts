import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { TaskForStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css']
})
export class PathsComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  course: Course;
  tasks: Task[];

  nodes: any[] = [];
  links: any[] = [];
  innerWidth: number = window.innerWidth;

  update$: Subject<boolean> = new Subject();

  breakPoint = environment.break_point;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private taskService: TaskService,
              private userService: UserService ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      params => {
        this.courseService.GetCourseById(params['course-id']).subscribe(
          dt => this.course = dt
        );
        this.taskService.GetCourseTasks(params['course-id']).subscribe(
          dt => {
            this.tasks = dt;
            this._SetNodes();
            this._SetLinks();
          }, err => {
            Utils.HandleError(this, err);
          }
        );
      }
    );
  }

  GetTaskPath(id: number): string{
    return `/course/${this.course.id}/task/${id}`;
  }

  IsCurrentUserTeacher(): boolean {
    return this.userService.IsCurrentUserTeacher();
  }

  IsCurrentUserStudent(): boolean {
    return this.userService.IsCurrentUserStudent();
  }

  GetTaskForStudent(task: Task) {
    return task as TaskForStudent;
  }

  GetTaskColor(task: Task): string {
    if (this.IsCurrentUserStudent()) {
      if (this.GetTaskForStudent(task).isToRepeat) {
        return 'rgb(255, 248, 107)';
      }
      if (this.GetTaskForStudent(task).taskCompletion === 100) {
        return 'rgb(105, 255, 162)';
      }
    }
    return (this.IsTaskValid(task)) ? 'rgb(194, 233, 248)' : 'rgb(255, 84, 84)';
  }

  IsTaskValid(task: Task): boolean {
    let returnValue = true;
    task.previousTasks.forEach(pTask => {
      returnValue = returnValue && task.dueDate >= this._GetTaskById(pTask.id).dueDate;
    });
    return returnValue;
  }

  private _SetNodes() {
    this.tasks.forEach(task => this.nodes.push({id: task.id.toString(), label: task.name, task}));
  }

  private _SetLinks() {
    const inceptiveTasks = this._FindInceptiveTasks();
    inceptiveTasks.forEach(task => this._SetLinksForTask(task));
  }

  private _SetLinksForTask(task: Task) {
    task.nextTasks.forEach(nTask => {
      const id = `L${task.id}-${nTask.id}`;
      if (this.links.filter(link => link.id === id).length === 0) {
        this.links.push({id, source: task.id, target: nTask.id});
      }
      this._SetLinksForTask(this._GetTaskById(nTask.id));
    });
  }

  private _FindInceptiveTasks(): Task[] {
    return this.tasks.filter(task => task.previousTasks.length === 0);
  }

  private _GetTaskById(id: number): Task {
    return this.tasks.filter(task => task.id === id)[0];
  }
}
