import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, observable, Subject } from 'rxjs';
import { Attachment } from 'src/app/Models/Attachment';
import { Course } from 'src/app/Models/Courses/Course';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { TaskService } from 'src/app/Services/task.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-task-composer',
  templateUrl: './task-composer.component.html',
  styleUrls: ['./task-composer.component.css', './../../../../form-style.css']
})
export class TaskComposerComponent implements OnInit {

  MAX_FILE_SIZE_MB = environment.max_file_size / 1000000;

  @Input() task: Task;
  @Input() course: Course;
  @Input() standalone: boolean;
  @Input() addPreviousTask$: Subject<Task>;

  @Output() save = new EventEmitter<string>();
  @Output() taskSelection = new EventEmitter<boolean>();

  taskSelectionMode: boolean = false;

  error: boolean;
  errorMessage: string;
  updateSuccess: boolean;

  filesToUpload: File[] = [];
  fileIdsToDelete: number[] = [];


  previousTasks: Task[] = [];
  nextTasks: Task[] = [];
  courseTasks: Task[] = [];
  taskToDisplay: Task[] = [];

  taskForm: FormGroup;
  submitted: boolean;

  @ViewChild('attachmentUpload')
  attachmentUpload: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService) { }

  ngOnInit(): void {
    if (this.addPreviousTask$) {
      this.addPreviousTask$.subscribe(task => {
        if ((!this.task || task.id != this.task.id) &&
           this.previousTasks.filter(t => t.id == task.id).length === 0) {
          this.previousTasks.push(task);
        }
        this.taskSelectionMode = false;
      });
    }
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      content: [],
      dueDate: ['', Validators.required],
      minutesInterval: ['0', [Validators.min(0), Validators.max(60)]],
      hoursInterval: ['0', [Validators.min(0)]],
      previousTask: []
    });
    this.taskService.GetCourseTasks(this.course.id).subscribe( 
      dt => {
        this.courseTasks = dt;
        this._UpdatePreviousAndNextTasks();
        this._UpdateTasktoDisplay();
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
    if (this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        content: (this.task.description) ? this.task.description.replace("<br />", "\n") : this.task.description,
        dueDate: this.task.dueDate,
        minutesInterval: this.task.learningTimeMinutes,
        hoursInterval: this.task.learningTimeHours
      });
    }
  }

  Submit() {
    if (this.standalone) {
      window.scroll(0,0);
    }
    this.submitted = true;
    if (!this.taskForm.valid) {
      return;
    }
    let ctls = this.taskForm.controls;
    let request = new FormData();
    request.append('courseId', this.course.id.toString()); 
    request.append('name', ctls.name.value);
    if (ctls.content.value && ctls.content.value != 'null') {
      request.append('description', ctls.content.value.replace(/<[^>]*>/g, '').replace("\n","<br />"));
    }
    request.append('dueDate', ctls.dueDate.value);
    request.append('learningTimeHours', ctls.hoursInterval.value);
    request.append('learningTimeMinutes', ctls.minutesInterval.value);
    this.filesToUpload.forEach(file => {
      request.append('files', file);
    });
    this.fileIdsToDelete.forEach(id => request.append('attachmentIdsToDelete', id.toString()));
    this.previousTasks.forEach(task => request.append('previousTaskIds', task.id.toString()));
    let observable: Observable<any>;
    if (this.task) {
      observable = this.taskService.UpdateTask(this.task.id, request);
    } else {
      observable = this.taskService.AddTask(request);
    }
    observable.subscribe(
      dt => {
        if (this.task) {
          this.save.emit(this.task.id.toString());
        } else {
          this.save.emit(((this.task) ? this.task.id.toString() : Utils.GetIdFromLocationUrl(dt.headers.get('Location'))));
        }
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    )    
  }

  get ctls() {
    return this.taskForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > environment.max_file_size) {
        alert("Plik może mieć maksymalnie 10 MB!");
        return;
      }
      this.filesToUpload.push(file);
      this.attachmentUpload.nativeElement.value = '';
    }
  }

  OnFileToUploadDelete(file: File) {
    let index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }

  OnAddedFileDelete(file: Attachment) {
    let index = this.task.attachments.indexOf(file);
    this.task.attachments.splice(index, 1);
    this.fileIdsToDelete.push(file.id);
  }

  OnPreviousTaskAdd() {
    let task = this.taskForm.controls.previousTask.value;
    if (task) {
      this.previousTasks.push(task);
      this._UpdateTasktoDisplay();
    }
  }

  OnPreviousTaskDelete(task: Task) {
    this.previousTasks.splice(this.previousTasks.indexOf(task), 1);
    this._UpdateTasktoDisplay();
  }

  private _UpdateTasktoDisplay() {
    this.taskToDisplay = this.courseTasks.filter(task => !this.previousTasks.includes(task) && !this.nextTasks.includes(task));
    if (this.task) {
      let currentTask: Task =this.taskToDisplay.filter(task => task.id === this.task.id)[0];
      let currentTaskId = this.taskToDisplay.indexOf(currentTask);
      if (currentTaskId > -1) {
        this.taskToDisplay.splice(currentTaskId, 1);
      }
    }
    this.taskToDisplay.sort((t1, t2) => ('' + t1.name).localeCompare(t2.name));
  }

  private _UpdatePreviousAndNextTasks() {
    if (this.task) {
      this.courseTasks.forEach(el => {
        this.task.previousTasks.forEach( el2 =>{
          if (el.id === el2.id) {
            this.previousTasks.push(el);
          }
        });
        this.task.nextTasks.forEach( el2 => {
          if (el.id === el2.id) {
            this.nextTasks.push(el);
          }
        })
      });
    }
  }

  CheckPrevTaskDate(pTask: Task): boolean {
    let currentTaskDate = this.taskForm.controls.dueDate.value;
    return currentTaskDate >= pTask.dueDate;
  }

  OnSelectTaskClick() {
    this.taskSelectionMode = !this.taskSelectionMode;
    this.taskSelection.emit(this.taskSelectionMode);
  }

}
