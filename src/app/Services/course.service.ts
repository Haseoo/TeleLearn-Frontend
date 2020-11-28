import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../Models/Courses/Course';
import { CourseBrief } from '../Models/Courses/CourseBrief';
import { CourseRequest } from '../Models/Requests/Courses/CourseRequest';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  GetMyCoursesForStudent(studentId: number): Observable<CourseBrief[]> {
    return this.httpClient.get<CourseBrief[]>(`${environment.api_url}/user/student/${studentId}/courses`);
  }

  GetMyCoursesForTeacher(teacherId: number): Observable<CourseBrief[]> {
    return this.httpClient.get<CourseBrief[]>(`${environment.api_url}/user/teacher/${teacherId}/courses`);
  }

  GetCourseById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${environment.api_url}/course/${id}`);
  }

  GetCourseBriefById(id: number): Observable<CourseBrief> {
    return this.httpClient.get<CourseBrief>(`${environment.api_url}/course/${id}/brief`);
  }

  AddCourse(request: CourseRequest): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/course`, request, { observe: 'response' });
  }

  UpdateCourse(courseId: number, request: CourseRequest): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/course/${courseId}`, request);
  }

  DeleteCourse(courseId: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/course/${courseId}`);
  }

  AcceptStudent(courseId: number, studentId: number): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/course/${courseId}/accept-student`, {userId: studentId});
  }

  SignOutStudent(courseId: number, studentId: number): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/course/${courseId}/sign-out`, {userId: studentId});
  }

  SignInStudent(courseId: number, studentId: number): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/course/${courseId}/sign-up`, {userId: studentId});
  }

}
