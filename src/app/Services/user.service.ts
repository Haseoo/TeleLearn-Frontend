import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../Models/Requests/LoginRequest';
import { StudentRegisterRequest } from '../Models/Requests/StudentRegisterRequest';
import { TeacherRegisterRequest } from '../Models/Requests/TeacherRegisterRequest';
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
    return this.httpClient.post<any>(`${environment.api_url}/user/register/student`, request);
  }

  registerTeacher(request: TeacherRegisterRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/user/register/teacher`, request);
  }

}
