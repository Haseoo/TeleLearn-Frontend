import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskSchedule } from '../Models/Courses/Tasks/TaskSchedule';
import { TaskToSchedule } from '../Models/Courses/Tasks/TaskToSchedule';
import { RecordLearningTimeRequest } from '../Models/Requests/Courses/RecordLearningTimeRequest';
import { ScheduleTaskRequest } from '../Models/Requests/Courses/ScheduleTaskRequest';
import { Time } from '../Models/Time';

@Injectable({
  providedIn: 'root'
})
export class TaskScheduleService {

  constructor(private httpClient: HttpClient) { }

  GetStudentSchedule(studentId: number): Observable<Map<string, TaskSchedule[]>> {
    return this.httpClient.get<Map<string, TaskSchedule[]>>(`${environment.api_url}/user/student/${studentId}/schedule`);
  }

  GetTaskToScheduleForStudent(studentId: number): Observable<Map<string, TaskToSchedule[]>> {
    return this.httpClient.get<Map<string, TaskToSchedule[]>>(`${environment.api_url}/user/student/${studentId}/tasks`);
  }

  GetTaskSchedule(taskId: number): Observable<TaskSchedule[]> {
    return this.httpClient.get<TaskSchedule[]>(`${environment.api_url}/task/${taskId}/schedule`);
  }

  GetById(id: number): Observable<TaskSchedule> {
    return this.httpClient.get<TaskSchedule>(`${environment.api_url}/schedule/${id}`);
  }

  Schedule(request: ScheduleTaskRequest): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/schedule`, request, { observe: 'response' });
  }

  UpdateLearningTime(id: number, startTime: string, duration: Time): Observable<any> {
    return this.httpClient.patch(`${environment.api_url}/schedule/${id}/learning-time`, {startTime, duration}, { observe: 'response' });
  }

  UpdateSchedule(id: number, newDuration: Time, newTime: string): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/schedule/${id}/planned-time`, {duration: newDuration, startTime: newTime}, { observe: 'response' });
  }

  DeleteSchedule(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/schedule/${id}`);
  }

}
