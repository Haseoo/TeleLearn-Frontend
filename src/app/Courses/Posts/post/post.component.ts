import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/Models/Courses/Posts/Post';
import { AttachmentService } from 'src/app/Services/attachment.service';
import * as FileSaver from 'file-saver';
import { Attachment } from 'src/app/Models/Attachment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() showCommentCount: boolean;
  @Input() showUpdate: boolean;
  @Input() showDelete: boolean;
  @Input() baseUrl: string;

  @Output() postUpdate = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter<any>();

  constructor(private attachmentService: AttachmentService) { }

  ngOnInit(): void {
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

}
