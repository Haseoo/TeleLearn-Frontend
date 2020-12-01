import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/Courses/Course';
import { Student } from 'src/app/Models/Student';
import { UserRole } from 'src/app/Models/UserRole';
import { CourseService } from 'src/app/Services/course.service';
import { UserService } from 'src/app/Services/user.service';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  course: Course;
  error: boolean;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      if (params['course-id']) {
        this.FetchCourse(params['course-id']);
      }
    });
  }

  IsCurrentUserTeacher(): boolean {
    return this.userService.IsCurrentUserTeacher();
  }

  OnUserDelete(student: Student) {
    if (confirm(`Czy na pewno chcesz usunać ucznia ${student.name} ${student.surname} z kursu? Operacja jest nieodwracalna`)) {
      this.courseService.SignOutStudent(this.course.id, student.id).subscribe (
        dt => {
          this.FetchCourse(this.course.id);
        }, err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

  OnStudentAccept(student: Student) {
    this.courseService.AcceptStudent(this.course.id, student.id).subscribe (
      dt => this.FetchCourse(this.course.id),
      err => {
        Utils.HandleError(this, err);
      }
    );
  }


  FetchCourse(courseId: number) {
    this.courseService.GetCourseById(courseId).subscribe (
      dt => {
        this.course = dt;
        this.course.allowedStudents.sort(this._StudentCompare);
        this.course.requestedStudents.sort(this._StudentCompare);
      }
    );
  }

  private _StudentCompare(student1: Student, student2: Student) {
    if (student1.surname < student2.surname) {
      return -1;
    }
    if (student1.surname < student2.surname) {
      return 1;
    }
    if (student1.name < student2.name) {
      return -1;
    }
    if (student1.name < student2.name) {
      return 1;
    }
    return 0;
  }

}
