import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attachment } from 'src/app/Models/Attachment';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { AttachmentService } from 'src/app/Services/attachment.service';
import * as FileSaver from 'file-saver';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';
import { UserService } from 'src/app/Services/user.service';
import { UserRole } from 'src/app/Models/UserRole';
import { TaskFroStudent } from 'src/app/Models/Courses/Tasks/TaskForStudent';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
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
  @Output() updateProgress = new EventEmitter<any>();
  @Output() markToRepeat = new EventEmitter<boolean>();


  constructor(private attachmentService: AttachmentService,
    private userService: UserService) { }

  ngOnInit(): void {
  }
  
  DownloadFile(attachment: Attachment) {
    this.attachmentService.getAttachment(attachment.id).subscribe(
      dt => {
        let file = new File([dt.body], attachment.fileName, {type: dt.body.type});
        FileSaver.saveAs(file);
      }, err => {
        console.error(err);
      }
    )
  }

  get taskForStudent(): TaskFroStudent {
    if(this._IsCurrentUserStudent()) {
      return <TaskFroStudent>this.task;
    } else {
      return undefined;
    }
  }

  private _IsCurrentUserStudent(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT];
  }

}
