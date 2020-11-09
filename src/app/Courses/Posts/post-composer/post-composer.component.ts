import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-post-composer',
  templateUrl: './post-composer.component.html',
  styleUrls: ['./post-composer.component.css', './../../../../form-style.css']
})
export class PostComposerComponent implements OnInit {

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
            let currentUser = this.userService.GetCurrentUser();
            if (currentUser.userRole.toString() === UserRole[UserRole.STUDENT] && !dt.areStudentsAllowedToPost) {
              this.router.navigate(['/auth-error']);
            }
          }
        )
      }
    );

  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 10000000) {
        alert("Plik może mieć maksymalnie 10 MB!");
        return;
      }
      this.filesToUpload.push(file);
      this.attachmentUpload.nativeElement.value = '';
    }
  }

  Submit() {
    window.scroll(0,0);
    this.submitted = true;
    if (this.postForm.valid) {
      let request = new FormData();
      let ctls = this.postForm.controls;
      request.append('commentingAllowed', ctls.commentingAllowed.value);
      request.append('content', ctls.content.value.replace(/<[^>]*>/g, '').replace("\n","<br />"));
      request.append('postVisibility', ctls.postVisibility.value);
      request.append('courseId', this.courseId.toString());
      
      this.filesToUpload.forEach(file => {
        request.append('files', file);
      });

      this.fileIdsToDelete.forEach(id => request.append('attachmentIdsToDelete', id.toString()))
      if (this.post) {
        this.postService.UpdatePost(this.post.id, request).subscribe(
          dt => {
            this._FetchPost(this.post.id);
            this.filesToUpload = [];
            this.fileIdsToDelete = [];
            this.updateSuccess = true;
            setTimeout(() => this.updateSuccess = false, 5000);
          }, err => {
            this.errorMessage = (err.error.message) ?  err.error.message : err.message;
            this.error = true;
          }
        );
      } else {
        this.postService.AddPost(request).subscribe(
          dt => {
            let postId = Utils.GetIdFromLocationUrl(dt.headers.get('Location'));
            this.router.navigate([`post/${postId}`], {relativeTo: this.activatedRoute.parent});
          }, err => {
            this.errorMessage = (err.error.message) ?  err.error.message : err.message;
            this.error = true;
          }
        );
      }
    }
  }

  OnFileToUploadDelete(file: File) {
    let index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }

  OnAddedFileDelete(file: Attachment) {
    let index = this.post.attachments.indexOf(file);
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
          content: this.post.content.replace("<br />", "\n"),
          postVisibility: this.post.postVisibility,
          commentingAllowed: this.post.commentingAllowed
        });
      }, err => {
        this.errorMessage = (err.error.message) ?  err.error.message : err.message;
        this.error = true;
      }
    );
  }

}
