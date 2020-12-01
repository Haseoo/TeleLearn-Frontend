import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/Models/Requests/LoginRequest';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../form-style.css', './login.component.css']
})
export class LoginComponent implements OnInit, IError {

  loginForm: FormGroup;
  submitted: boolean;
  isRedirectFromRegistration: boolean;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  error: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      this.isRedirectFromRegistration = params.redirect === 'registration';
      this.returnUrl = params.returnUrl;
    }
    );
  }

  get ctls() {
    return this.loginForm.controls;
  }

  Submit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    } else {
      const request = new LoginRequest(this.loginForm.value.login,
        this.loginForm.value.password);
      this.userService.PreformLogin(request).subscribe(
        dt => {
          this.userService.storeLogin(dt);
          if (this.returnUrl) {
            setTimeout(() =>
              this.router.navigate([this.returnUrl]));
          } else {
            this.router.navigate(['/']);
          }
        },
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }
}
