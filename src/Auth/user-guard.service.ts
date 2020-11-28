import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from 'src/app/Models/UserRole';
import { UserService } from 'src/app/Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  constructor(
      private router: Router,
      private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.GetCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    if (currentUser.userRole.toString() === UserRole[UserRole.TEACHER] ||
      currentUser.userRole.toString() === UserRole[UserRole.STUDENT]) {
        return true;
    }
    this.router.navigate(['/auth-error']);
    return false;
  }
}
