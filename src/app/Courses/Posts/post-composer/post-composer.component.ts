import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attachment } from 'src/app/Models/Attachment';
import { Post } from 'src/app/Models/Courses/Posts/Post';
import { PostVisibility } from 'src/app/Models/Courses/Posts/PostVisibility';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-post-composer',
  templateUrl: './post-composer.component.html',
  styleUrls: ['./post-composer.component.css', './../../../../form-style.css']
})
export class PostComposerComponent implements OnInit, IError {

  MAX_FILE_SIZE_MB = environment.max_file_size / 1000000;

  error: boolean;
  errorMessage: string;
  updateSuccess: boolean;

  filesToUpload: File[] = [];
  fileIdsToDelete: number[] = [];

  postForm: FormGroup;
  submitted: boolean;

  post: Post;

  POST_VISIBILITY_EVERYONE: PostVisibility = PostVisibility.EVERYONE;
  POST_VISIBILITY_ONLY_TEACHER: PostVisibility = PostVisibility.ONLY_TEACHER;

  courseId: number;

  @ViewChild('attachmentUpload')
  attachmentUpload: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      postVisibility: [PostVisibility.EVERYONE, [Validators.required]],
      commentingAllowed: [true]

    });
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id) {
          this._FetchPost(params.id);
        }
      }
    );
    this.activatedRoute.parent.params.subscribe(
      params => {
        this.courseId = params['course-id'];
        this.courseService.GetCourseById(this.courseId).subscribe(
          dt => {
            if (this.userService.IsCurrentUserStudent() && !dt.areStudentsAllowedToPost) {
              this.router.navigate(['/auth-error']);
            }
          }
        );
      }
    );

  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > environment.max_file_size) {
        alert('Plik może mieć maksymalnie 10 MB!');
        return;
      }
      this.filesToUpload.push(file);
      this.attachmentUpload.nativeElement.value = '';
    }
  }

  Submit() {
    this.submitted = true;
    if (this.postForm.valid) {
      const request = new FormData();
      const data = this.postForm.value;
      request.append('commentingAllowed', data.commentingAllowed);
      request.append('content', data.content.replace(/<[^>]*>/g, '').replace('\n', '<br />'));
      request.append('postVisibility', data.postVisibility);
      request.append('courseId', this.courseId.toString());
      this.filesToUpload.forEach(file => {
        request.append('files', file);
      });

      this.fileIdsToDelete.forEach(id => request.append('attachmentIdsToDelete', id.toString()));
      if (this.post) {
        this.postService.UpdatePost(this.post.id, request).subscribe(
          dt => {
            this._FetchPost(this.post.id);
            this.filesToUpload = [];
            this.fileIdsToDelete = [];
            this.updateSuccess = true;
            setTimeout(() => this.updateSuccess = false, 5000);
          }, err => {
            Utils.HandleError(this, err);
          }
        );
      } else {
        this.postService.AddPost(request).subscribe(
          dt => {
            const postId = Utils.GetIdFromLocationUrl(dt.headers.get('Location'));
            this.router.navigate([`post/${postId}`], {relativeTo: this.activatedRoute.parent});
          }, err => {
            Utils.HandleError(this, err);
          }
        );
      }
    }
  }

  OnFileToUploadDelete(file: File) {
    const index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }

  OnAddedFileDelete(file: Attachment) {
    const index = this.post.attachments.indexOf(file);
    this.post.attachments.splice(index, 1);
    this.fileIdsToDelete.push(file.id);
  }

  get ctls() {
    return this.postForm.controls;
  }

  private _FetchPost(id: number) {
    this.postService.GetPostById(id).subscribe(
      dt => {
        this.post = dt;
        this.postForm.setValue ({
          content: this.post.content.replace('<br />', '\n'),
          postVisibility: this.post.postVisibility,
          commentingAllowed: this.post.commentingAllowed
        });
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  IsCurrentUserStudent(): boolean {
    return this.userService.IsCurrentUserStudent();
  }

}
