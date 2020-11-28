import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private httpClient: HttpClient) { }

  public getAttachment(id: number): Observable<any> {
    return this.httpClient.get(`${environment.api_url}/file/${id}`, { responseType: 'blob', observe: 'response' });
  }
}
