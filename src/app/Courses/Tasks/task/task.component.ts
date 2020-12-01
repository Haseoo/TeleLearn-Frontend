import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attachment } from 'src/app/Models/Attachment';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { AttachmentService } from 'src/app/Services/attachment.service';
import * as FileSaver from 'file-saver';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { UserService } from 'src/app/Services/user.service';
import { UserRole } from 'src/app/Models/UserRole';
import { TaskForStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', '../../../../form-style.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() course: CourseBrief;
  @Input() showManagement: boolean;
  @Input() showForStudent: boolean;
  @Input() standalone: boolean;
  @Input() taskSchedule: TaskSchedule[];

  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() updateProgress = new EventEmitter<number>();
  @Output() markToRepeat = new EventEmitter<boolean>();

  showProgressUpdate = false;
  progressForm: FormGroup;


  constructor(private attachmentService: AttachmentService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.userService.IsCurrentUserStudent()) {
      this.progressForm = this.formBuilder.group({
        progress: [this.taskForStudent.taskCompletion, [Validators.required, Validators.min(0), Validators.max(100)]]
      });
    }
  }

  DownloadFile(attachment: Attachment) {
    this.attachmentService.getAttachment(attachment.id).subscribe(
      dt => {
        const file = new File([dt.body], attachment.fileName, {type: dt.body.type});
        FileSaver.saveAs(file);
      }, err => {
        console.error(err);
      }
    );
  }

  get taskForStudent(): TaskForStudent {
    if (this.userService.IsCurrentUserStudent()) {
      return this.task as TaskForStudent;
    } else {
      return undefined;
    }
  }

  OnProgressClick() {
    this.showProgressUpdate = !this.showProgressUpdate;
    this.progressForm.setValue({progress: this.taskForStudent.taskCompletion});
  }

  OnProgressApply() {
    const newValue = this.progressForm.value.progress;
    this.updateProgress.emit(newValue);
    this.showProgressUpdate = false;
  }

}
