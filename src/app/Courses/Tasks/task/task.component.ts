import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attachment } from 'src/app/Models/Attachment';
import { Task } from 'src/app/Models/Courses/Tasks/Task';
import { AttachmentService } from 'src/app/Services/attachment.service';
import * as FileSaver from 'file-saver';
import { Course } from 'src/app/Models/Courses/Course';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() course: CourseBrief;
  @Input() showManagement: boolean;
  @Input() standalone: boolean;

  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor(private attachmentService: AttachmentService) { }

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

}
