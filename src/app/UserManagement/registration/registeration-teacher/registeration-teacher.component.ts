import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherRegisterRequest } from 'src/app/Models/Requests/TeacherRegisterRequest';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-registeration-teacher',
  templateUrl: './registeration-teacher.component.html',
  styleUrls: ['./registeration-teacher.component.css', './../../../../form-style.css']
})
export class RegisterationTeacherComponent implements OnInit, IError {

  registerationForm: FormGroup;
  submitted: boolean;
  readonly PASSWORD_MIN_LENGHT = 6;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }
  error: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGHT)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      unit: [''],
      title: [''],
      tos: [false]
    });
  }

  get ctls() {
    return this.registerationForm.controls;
  }

  Submit() {
    this.submitted = true;
    if (!this.registerationForm.valid || !this.registerationForm.controls.tos.value) {
      return;
    } else {
      const data = this.registerationForm.value;
      const request = new TeacherRegisterRequest(data.login,
        data.password,
        data.email,
        data.name,
        data.surname,
        data.unit,
        data.title);
      this.userService.registerTeacher(request).subscribe(
        dt => this.router.navigate(['/login'], {queryParams: {redirect: 'registration'}}),
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

}
