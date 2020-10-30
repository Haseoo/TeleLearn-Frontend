import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation } from '../Models/Conversation';
import { Message } from '../Models/Message';
import { SendMessageRequest } from '../Models/Requests/SendMessageRequest';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

  getConversations(userId: number): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(`${environment.api_url}/message/${userId}`);
  }

  getConversation(user1Id: number, user2Id: number): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${environment.api_url}/message/${user1Id}/${user2Id}`);
  }

  sendMessage(request: SendMessageRequest): Observable<any> {
    return this.httpClient.put(`${environment.api_url}/message`, request);
  }
}
