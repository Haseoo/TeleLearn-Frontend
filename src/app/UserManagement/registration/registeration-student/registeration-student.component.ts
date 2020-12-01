import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentRegisterRequest } from 'src/app/Models/Requests/StudentRegisterRequest';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-registeration-student',
  templateUrl: './registeration-student.component.html',
  styleUrls: ['./registeration-student.component.css', './../../../../form-style.css']
})
export class RegisterationStudentComponent implements OnInit, IError {

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
      tos: [false]
    });
  }

  get ctls() {
    return this.registerationForm.controls;
  }

  Submit() {
    this.submitted = true;
    if (!this.registerationForm.valid || !this.registerationForm.value.tos) {
      return;
    } else {
      const data = this.registerationForm.value;
      const request = new StudentRegisterRequest(data.login,
        data.password,
        data.email,
        data.name,
        data.surname,
        data.unit);
      this.userService.registerStudent(request).subscribe(
        dt => this.router.navigate(['/login'], {queryParams: {redirect: 'registration'}}),
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

}
