import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/Models/Courses/Posts/Post';
import { AttachmentService } from 'src/app/Services/attachment.service';

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

  DownloadFile(id: number) {
    this.attachmentService.getAttachment(id).subscribe(
      dt => {
        let blob = new Blob(dt);
      }, err => {
        console.error(err);
      }
    )
  }

}
