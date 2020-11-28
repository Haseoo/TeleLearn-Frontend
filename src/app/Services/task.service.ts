import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../Models/Courses/Tasks/Task';
import { TaskProgressRequest } from '../Models/Requests/Courses/TaskProgressRequest';
import { TaskRepeatRequest } from '../Models/Requests/Courses/TaskRepeatRequest';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  GetCourseTasks(courseId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.api_url}/course/${courseId}/task`);
  }

  GetById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.api_url}/task/${id}`);
  }

  AddTask(request: FormData): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/task`, request, { observe: 'response' });
  }

  UpdateTask(id: number, request: FormData): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/task/${id}`, request, { observe: 'response' });
  }

  SetTaskToRepeat(id: number, request: TaskRepeatRequest): Observable<any>{
    return this.httpClient.patch(`${environment.api_url}/task/${id}/repeat`, request, { observe: 'response' });
  }

  SetTaskProgress(id: number, request: TaskProgressRequest): Observable<any>{
    return this.httpClient.patch(`${environment.api_url}/task/${id}/progress`, request, { observe: 'response' });
  }

  DeleteTask(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/task/${id}`, { observe: 'response' });
  }
}
