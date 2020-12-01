import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { CourseService } from 'src/app/Services/course.service';
import { TaskService } from 'src/app/Services/task.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  editMode: boolean;
  taskMode: boolean;
  selectionMode: boolean;

  course: Course;
  tasks: Task[];

  nodes: any[] = [];
  links: any[] = [];
  innerWidth: number = window.innerWidth;

  update$: Subject<boolean> = new Subject();
  addPreviousTask$: Subject<Task> = new Subject();

  currentTask: Task;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      params => {
        this._FetchData(params['course-id']);
      }
    );
  }

  IsTaskValid(task: Task): boolean {
    let returnValue = true;
    task.previousTasks.forEach(pTask => {
      returnValue = returnValue && task.dueDate >= this._GetTaskById(pTask.id).dueDate;
    });
    return returnValue;
  }

  OnTaskClick(task: Task) {
    if (!this.selectionMode) {
      this.editMode = false;
      this.taskMode = true;
      this.currentTask = task;
    } else {
      this.addPreviousTask$.next(task);
      this.selectionMode = false;
    }
  }

  OnTaskAdd() {
    this.editMode = false;
    this.currentTask = undefined;
    this.taskMode = false;
    this.editMode = true;
  }

  OnTaskSave(id: string) {
    this._FetchData(this.course.id, Number.parseInt(id, 10));
    this.selectionMode = false;
  }

  OnTaskUpdate() {
    this.taskMode = false;
    this.editMode = true;
  }

  OnTaskDelete() {
    if (confirm('Operacja jest nieodwracalna! Kontynuować?')) {
      this.taskService.DeleteTask(this.currentTask.id).subscribe(
        dt => {
          this.taskMode = false;
          this._FetchData(this.course.id);
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnSelectionChange(selection: boolean) {
    this.selectionMode = selection;
  }

  private _SetNodes() {
    this.nodes = [];
    this.tasks.forEach(task => this.nodes.push({id: task.id.toString(), label: task.name, task}));
  }

  private _SetLinks() {
    this.links = [];
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

  private _FetchData(courseId: number, newTaskId?: number) {
    this.courseService.GetCourseById(courseId).subscribe(
      dt => this.course = dt
    );
    this.taskService.GetCourseTasks(courseId).subscribe(
      dt => {
        this.tasks = dt;
        this._SetNodes();
        this._SetLinks();
        this.update$.next(false);
        if (newTaskId) {
          this.currentTask = this._GetTaskById(newTaskId);
          this.editMode = false;
          this.taskMode = true;
        }
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }
}
