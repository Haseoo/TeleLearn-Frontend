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
            })
          }
        );
      }
    })
  }

  get ctls() {
    return this.courseForm.controls;
  }

  Submit() {
    this.submited = true;
    if (!this.courseForm.valid) {
      window.scroll(0,0);
      return;
    }
    let request = new CourseRequest();
    let ctls = this.courseForm.controls;
    request.ownerId = this.userService.GetCurrentUser().id;
    request.name = ctls.name.value;
    request.welcomePageHtmlContent = ctls.welcomePageHtmlContent.value;
    request.isPublicCourse = ctls.publicCourse.value;
    request.isAutoAccept = ctls.autoAccept.value;
    request.areStudentsAllowedToPost = ctls.studentsAllowedToPost.value;
    if (this.course) {
      this.courseService.UpdateCourse(this.course.id, request).subscribe(
        dt => {
          this.editSuccess = true;
          setTimeout(() => this.editSuccess = false, 5000);
        }, err => {
          window.scroll(0,0);
          this.errorMessage = (err.error.message) ? err.error.message : err.message;
          this.error = true;
        }
      )
    } else {
      this.courseService.AddCourse(request).subscribe(
        dt => {
          let id = Utils.GetIdFromLocationUrl(dt.headers.get('Location'));
          this.router.navigate([`/course/${id}`]);
        }, err => {
          this.errorMessage = (err.error.message) ? err.error.message : err.message;
          this.error = true;
        }
      )
    }
  }

  OnCourseDelete() {
    if (confirm("Operacja jest nieodwracalna, kontynuować?")) {
      this.courseService.DeleteCourse(this.course.id).subscribe(
        dt => {
          this.router.navigate(['my-courses']);
        }, err => {
          this.errorMessage = (err.error.message) ? err.error.message : err.message;
          this.error = true;
        }
      )
    }
  }

}
