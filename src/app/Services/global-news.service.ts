import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { Observable } from 'rxjs';
import { Page } from 'src/app/Models/Page';
import { environment } from 'src/environments/environment';
import { GlobalNewsRequest } from '../Models/Requests/GlobalNewsRequest';

@Injectable({
  providedIn: 'root'
})
export class GlobalNewsService {

  constructor(private httpClient: HttpClient) { }

  getBriefs(page: number, size: number): Observable<Page<GlobalNews>> {
    const params = new HttpParams().set('pageNo', page.toString()).set('pageSize', size.toString());
    return this.httpClient.get<Page<GlobalNews>>(`${environment.api_url}/news/get`, { params });
  }

  getAricle(id: number): Observable<GlobalNews> {
    return this.httpClient.get<GlobalNews>(`${environment.api_url}/news/get/${id}`);
  }

  addArticle(request: GlobalNewsRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/news`, request, { observe: 'response' });
  }

  updateArticle(id: number, request: GlobalNewsRequest): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/news/${id}`, request, { observe: 'response' });
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api_url}/news/${id}`);
  }
}
