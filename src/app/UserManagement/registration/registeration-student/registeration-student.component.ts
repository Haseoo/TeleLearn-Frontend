import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentRegisterRequest } from 'src/app/Models/Requests/StudentRegisterRequest';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registeration-student',
  templateUrl: './registeration-student.component.html',
  styleUrls: ['./registeration-student.component.css', './../../../../form-style.css']
})
export class RegisterationStudentComponent implements OnInit {

  registerationForm: FormGroup;
  submitted: boolean;
  responseError: boolean;
  responseErrorMessage: string;
  readonly PASSWORD_MIN_LENGHT = 6;

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
      tos: [false]
    });
  }

  get ctls() {
    return this.registerationForm.controls;
  }

  Submit() {
    window.scroll(0, 0);
    this.submitted = true;
    if (!this.registerationForm.valid || !this.registerationForm.controls.tos.value) {
      return;
    } else {
      const ctls = this.registerationForm.controls;
      const request = new StudentRegisterRequest(ctls.login.value,
        ctls.password.value,
        ctls.email.value,
        ctls.name.value,
        ctls.surname.value,
        ctls.unit.value);
      this.userService.registerStudent(request).subscribe(
        dt => this.router.navigate(['/login'], {queryParams: {redirect: 'registration'}}),
        err => {
          this.responseErrorMessage = (err.error.message) ? err.error.message : err.message;
          this.responseError = true;
        }
      );
    }
  }

}
