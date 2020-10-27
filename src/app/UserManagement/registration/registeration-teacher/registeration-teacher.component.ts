import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
    }
  }

}
