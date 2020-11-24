import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LearningTimeRequest } from '../Models/Requests/LearningTimeRequest';
import { LoginRequest } from '../Models/Requests/LoginRequest';
import { PasswordChangeRequest } from '../Models/Requests/PasswordChangeRequest';
import { StudentRegisterRequest } from '../Models/Requests/StudentRegisterRequest';
import { StudentUpdateRequest } from '../Models/Requests/StudentUpdateRequest';
import { TeacherRegisterRequest } from '../Models/Requests/TeacherRegisterRequest';
import { TeacherUpdateRequest } from '../Models/Requests/TeacherUpdateRequest';
import { Student } from '../Models/Student';
import { StudentStat } from '../Models/StudentStat';
import { Teacher } from '../Models/Teacher';
import { Time } from '../Models/Time';
import { User } from '../Models/User';
import { UserLoginResponse } from '../Models/UserLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  GetCurrentUser(): UserLoginResponse {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  PreformLogin(loginRequest: LoginRequest): Observable<UserLoginResponse> {
    return this.httpClient.post<UserLoginResponse>(`${environment.api_url}/user/login`, loginRequest);
  }

  storeLogin(userLoginResponse: UserLoginResponse) : void {
    setTimeout(() => localStorage.setItem('currentUser', JSON.stringify(userLoginResponse)));
  }

  logout(): void {
    setTimeout(() => localStorage.removeItem('currentUser'));
  }

  registerStudent(request: StudentRegisterRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/user/student`, request);
  }

  registerTeacher(request: TeacherRegisterRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/user/teacher`, request);
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${environment.api_url}/user/student/${id}`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<Student>(`${environment.api_url}/user/${id}`);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${environment.api_url}/user/teacher/${id}`);
  }

  updateStudent(id: number, request: StudentUpdateRequest): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/user/student/${id}`, request);
  }

  updateTeacher(id: number, request: TeacherUpdateRequest): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/user/teacher/${id}`, request);
  }

  updateCurrentUserInfo() {
    let user = this.GetCurrentUser();
    this.getUser(user.id).subscribe(
      dt=> {
        user.name = dt.name;
        user.surname = dt.surname;
        this.storeLogin(user);
      }
    )
  }

  changePassword(id: number, request: PasswordChangeRequest): Observable<any> {
    return this.httpClient.patch(`${environment.api_url}/user/${id}`, request);
  }

  GetTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${environment.api_url}/user/teacher`);
  }

  GetStudentStats(studentId: number): Observable<StudentStat> {
    return this.httpClient.get<StudentStat>(`${environment.api_url}/user/student/${studentId}/stat`)
  }

  GetLearningTimeForStudent(studentId: number): Observable<Map<string, Time>> {
    return this.httpClient.get<Map<string, Time>>(`${environment.api_url}/learning-time/${studentId}`);
  }

  SetLearningTimeForStudent(request: LearningTimeRequest) {
    return this.httpClient.put<Map<string, Time>>(`${environment.api_url}/learning-time`, request, { observe: 'response' });
  }

}
