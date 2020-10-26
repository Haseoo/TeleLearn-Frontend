import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/Models/Requests/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../form-style.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  responseError: boolean;
  responseErrorMessage: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get ctls() {
    return this.loginForm.controls;
  }

  Submit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    } else {
      const request = new LoginRequest(this.loginForm.controls.login.value,
        this.loginForm.controls.password.value);
      console.log(request);
    }
  }

}
