import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = this.userService.GetCurrentUser();
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: currentUser.token
              }
          });
      }

      return next.handle(request);
  }
}
