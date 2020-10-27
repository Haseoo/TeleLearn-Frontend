import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
