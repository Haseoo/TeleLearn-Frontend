import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../Models/Courses/Posts/Comment';
import { Post } from '../Models/Courses/Posts/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  AddPost(request: FormData): Observable<any>{
    return this.httpClient.post(`${environment.api_url}/post`, request,  { observe: 'response' });
  }

  GetPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${environment.api_url}/post/${id}`);
  }

  UpdatePost(id: number, request: FormData): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/post/${id}`, request);
  }

  GetCoursePost(courseId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.api_url}/course/${courseId}/post`);
  }

  DeletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/post/${id}`);
  }

  GetComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${environment.api_url}/post/${postId}/comment`);
  }

  AddComment(postId: number, content: string): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/post/${postId}/comment`, {content},  { observe: 'response' });
  }

  DeleteComment(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}/comment/${id}`);
  }
}
