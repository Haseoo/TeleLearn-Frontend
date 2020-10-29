import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherRegisterRequest } from 'src/app/Models/Requests/TeacherRegisterRequest';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registeration-teacher',
  templateUrl: './registeration-teacher.component.html',
  styleUrls: ['./registeration-teacher.component.css', './../../../../form-style.css']
})
export class RegisterationTeacherComponent implements OnInit {

  registerationForm: FormGroup;
  submitted: boolean;
  responseError: boolean;
  responseErrorMessage: string;
  readonly PASSWORD_MIN_LENGHT:number = 6;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGHT)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      unit: [''],
      title: [''],
      tos:[false]
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
      let ctls = this.registerationForm.controls;
      let request = new TeacherRegisterRequest(ctls.login.value,
        ctls.password.value,
        ctls.email.value,
        ctls.name.value,
        ctls.surname.value,
        ctls.unit.value,
        ctls.title.value);
      this.userService.registerTeacher(request).subscribe(
        dt => this.router.navigate(['/login'], {queryParams: {redirect: 'registration'}}),
        err => {
          this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
          this.responseError = true;
        }
      );
    }
  }

}
