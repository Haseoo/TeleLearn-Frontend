import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', './../../../form-style.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  private timeout: any;

  constructor(private userService: UserService,
              private router: Router) { }
  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  ngOnInit(): void {
    this.userService.logout();
    this.timeout = setTimeout(() => this.router.navigate(['/']), 3000);
  }

}
