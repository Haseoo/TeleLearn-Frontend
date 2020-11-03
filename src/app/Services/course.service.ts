import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseBrief } from '../Models/Courses/CourseBrief';
import { UserService } from './user.service';

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

}
