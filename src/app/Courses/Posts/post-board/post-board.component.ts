import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Post } from 'src/app/Models/Courses/Posts/Post';
import { CourseService } from 'src/app/Services/course.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-post-board',
  templateUrl: './post-board.component.html',
  styleUrls: ['./post-board.component.css']
})
export class PostBoardComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  posts: Post[];
  course: Course;

  current = 1;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService,
              private courseService: CourseService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      params => {
        const courseId = params['course-id'];
        if (courseId) {
          this.courseService.GetCourseById(courseId).subscribe (
            dt => this.course = dt,
            err => {
              Utils.HandleError(this, err);
            }
          );
          this._FetchPosts(courseId);
        }
      }
    );
  }

  IsCurrentUserOwner(): boolean {
    return this.userService.GetCurrentUser().id === this.course.owner.id;
  }

  IsCurrentUserPermittedToDeletePost(post: Post) {
    return this.IsCurrentUserOwner() || this.userService.GetCurrentUser().id === post.author.id;
  }

  IsCurrentUserPermittedToUpdatePost(post: Post) {
    return this.userService.GetCurrentUser().id === post.author.id;
  }

  _FetchPosts(courseId: number) {
    this.postService.GetCoursePost(courseId).subscribe (
      dt => {
        this.posts = dt;
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }

  OnPostDelete(post: Post) {
    if (confirm('Operacja jest niedwracalna! Kontynować?')) {
      this.postService.DeletePost(post.id).subscribe(
        dt => this._FetchPosts(this.course.id),
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }
  OnPostEdit(post: Post) {
    this.router.navigate([`post/edit/${post.id}`], {relativeTo: this.activatedRoute.parent});
  }

  GetBaseUrl(): string {
    return `/course/${this.course.id}/post`;
  }

  OnAddPost() {
    this.router.navigate(['post/add'], {relativeTo: this.activatedRoute.parent});
  }
}
