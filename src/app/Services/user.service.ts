import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public GetCurrentUser():any {
    return localStorage.getItem('currentUser');
  }
}
