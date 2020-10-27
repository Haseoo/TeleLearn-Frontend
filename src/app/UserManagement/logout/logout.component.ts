import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', './../../../form-style.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.logout();
    setTimeout(() => this.router.navigate(['/']), 5000);
  }

}
