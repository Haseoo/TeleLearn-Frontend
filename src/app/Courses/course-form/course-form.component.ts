import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { CourseRequest } from 'src/app/Models/Requests/Courses/CourseRequest';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css', './../../../form-style.css']
})
export class CourseFormComponent implements OnInit {

  error: boolean;
  errorMessage: string;
  editSuccess: boolean;
  submited: boolean;

  courseForm: FormGroup;
  course: Course;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        welcomePageHtmlContent: [''],
        publicCourse: [false],
        autoAccept: [false],
        studentsAllowedToPost: [true]
    });
    this.activatedRoute.parent.params.subscribe(params => {
      if (params['course-id']) {
        this.courseService.GetCourseById(params['course-id']).subscribe (
          dt => {
            this.course = dt;
            this.courseForm.setValue({
              name: this.course.name,
              welcomePageHtmlContent: this.course.welcomePageHtmlContent,
              publicCourse: this.course.isPublicCourse,
              autoAccept: this.course.isAutoAccept,
              studentsAllowedToPost: this.course.areStudentsAllowedToPost
            });
          }
        );
      }
    });
  }

  get ctls() {
    return this.courseForm.controls;
  }

  Submit() {
    this.submited = true;
    if (!this.courseForm.valid) {
      return;
    }
    const request = new CourseRequest();
    const data = this.courseForm.value;
    request.ownerId = this.userService.GetCurrentUser().id;
    request.name = data.name;
    request.welcomePageHtmlContent = data.welcomePageHtmlContent;
    request.isPublicCourse = data.publicCourse;
    request.isAutoAccept = data.autoAccept;
    request.areStudentsAllowedToPost = data.studentsAllowedToPost;
    if (this.course) {
      this.courseService.UpdateCourse(this.course.id, request).subscribe(
        () => {
          this.editSuccess = true;
          setTimeout(() => this.editSuccess = false, 5000);
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    } else {
      this.courseService.AddCourse(request).subscribe(
        dt => {
          const id = Utils.GetIdFromLocationUrl(dt.headers.get('Location'));
          this.router.navigate([`/course/${id}`]);
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnCourseDelete() {
    if (confirm('Operacja jest nieodwracalna, kontynuować?')) {
      this.courseService.DeleteCourse(this.course.id).subscribe(
        dt => {
          this.router.navigate(['my-courses']);
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

}
