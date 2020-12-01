import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Comment } from 'src/app/Models/Courses/Posts/Comment';
import { Post } from 'src/app/Models/Courses/Posts/Post';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  post: Post;
  course: Course;
  comments: Comment[];

  commentForm: FormGroup;

  current = 1;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private courseService: CourseService,
              private postService: PostService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({content: ['']});
    this.activatedRoute.params.subscribe(
      params => {
        this.postService.GetPostById(params.id).subscribe(
          dt => {
            this.post = dt;
            this.courseService.GetCourseById(this.post.courseId).subscribe(
              dt2 => this.course = dt2,
              err => {
                Utils.HandleError(this, err);
              }
            );
            this._FetchComments();
          }, err => {
            Utils.HandleError(this, err);
          }
        );
      }
    );
  }

  HasCurrentUserRightsToDelete(item: any): boolean {
    const currentUser = this.userService.GetCurrentUser();
    return this.userService.IsCurrentUserTeacher() || item.author.id === currentUser.id;
  }

  HasCurrentUserRightsEdit(item: any): boolean {
    const currentUser = this.userService.GetCurrentUser();
    return item.author.id === currentUser.id;
  }

  OnPostEdit() {
    this.router.navigate([`post/edit/${this.post.id}`], {relativeTo: this.activatedRoute.parent});
  }

  OnPostDelete() {
    if (confirm('Operacja jest niedwracalna! Kontynować?')) {
      this.postService.DeletePost(this.post.id).subscribe(
        dt => this.router.navigate(['board'], {relativeTo: this.activatedRoute.parent}),
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnAddComment() {
    const content = this.commentForm.value.content;
    if (content) {
      this.postService.AddComment(this.post.id, content).subscribe(
        () => {
          this.commentForm.reset();
          this._FetchComments();
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnDeleteComment(comment: Comment) {
    if (confirm('Operacja jest nieodwracalna! Kontynuować?')) {
      this.postService.DeleteComment(comment.id).subscribe(
        dt => this._FetchComments(),
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  private _FetchComments() {
    this.postService.GetComments(this.post.id).subscribe(
      dt => this.comments = dt,
      err => {
        Utils.HandleError(this, err);
      }
    );
  }
}
