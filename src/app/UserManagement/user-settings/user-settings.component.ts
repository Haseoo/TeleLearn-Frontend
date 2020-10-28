import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { PasswordChangeRequest } from 'src/app/Models/Requests/PasswordChangeRequest';
import { StudentUpdateRequest } from 'src/app/Models/Requests/StudentUpdateRequest';
import { TeacherUpdateRequest } from 'src/app/Models/Requests/TeacherUpdateRequest';
import { Student } from 'src/app/Models/Student';
import { Teacher } from 'src/app/Models/Teacher';
import { UserRole } from 'src/app/Models/UserRole';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css', './../../../form-style.css']
})
export class UserSettingsComponent implements OnInit {

  userEditForm: FormGroup;
  userEditSubmitted: boolean;
  editResponseError: boolean;
  editResponseErrorMessage: string;
  editUserSuccess: boolean;

  passwordForm: FormGroup;
  passwordSubmitted: boolean;
  passwordResponseError: boolean;
  passwordResponseErrorMessage: string;
  passwordChangeSuccess: boolean;
  readonly PASSWORD_MIN_LENGHT: number = 6;

  isTeacher: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      unit: [''],
      title: ['']
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGHT)]]
    });

    if (this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT]) {
      this.userService.getStudent(this.userService.GetCurrentUser().id).subscribe(
        dt => {
          this.userEditForm.patchValue({
            name: dt.name,
            surname: dt.surname,
            email: dt.email,
            unit: dt.unit
          })
        },
        err => {
          this.editResponseError = true;
          this.editResponseErrorMessage = err.error.message;
        }
      )
    } else if (this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER]) {
      this.userService.getTeacher(this.userService.GetCurrentUser().id).subscribe(
        dt => {
          this.isTeacher = true;
          this.userEditForm.patchValue({
            name: dt.name,
            surname: dt.surname,
            email: dt.email,
            unit: dt.unit,
            title: dt.title
          })
        },
        err => {
          this.editResponseError = true;
          this.editResponseErrorMessage = err.error.message;
        }
      )
    }
  }

  get ectls() {
    return this.userEditForm.controls;
  }

  get pctls() {
    return this.passwordForm.controls;
  }

  PasswordSubmit() {
    this.passwordSubmitted = true;
    if (this.passwordForm.valid) {
      let request = new PasswordChangeRequest(this.passwordForm.controls.oldPassword.value,
        this.passwordForm.controls.newPassword.value);
      this.userService.changePassword(this.userService.GetCurrentUser().id, request).subscribe (
        dt => {
            this.passwordResponseError = false;
            this.passwordChangeSuccess = true;
            this.passwordForm.reset();
            this.passwordSubmitted = false;
            setTimeout(() => this.passwordChangeSuccess = false, 5000);
        }, err => {
          this.passwordResponseErrorMessage = err.error.message;
          this.passwordResponseError = true;
        }
      )
    }
  }

  UserEditSubmit() {
    this.userEditSubmitted = true;
    if (this.userEditForm.valid) {
      if (this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT]) {
        let request = new StudentUpdateRequest();
        let ctls = this.userEditForm.controls;
        request.email = ctls.email.value;
        request.name = ctls.name.value;
        request.surname = ctls.surname.value;
        request.unit = ctls.unit.value;
        this.userService.updateStudent(this.userService.GetCurrentUser().id, request).subscribe(
          dt => {
            this.editResponseError = false;
            this.editUserSuccess = true;
            this.userService.updateCurrentUserInfo();
            this.userEditSubmitted = false;
            setTimeout(() => this.editUserSuccess = false, 5000);
          }, err => {
            this.editResponseErrorMessage = err.error.message;
            this.editResponseError = true;
          }
        );
      } else if (this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER]) {
        let request = new TeacherUpdateRequest();
        let ctls = this.userEditForm.controls;
        request.email = ctls.email.value;
        request.name = ctls.name.value;
        request.surname = ctls.surname.value;
        request.unit = ctls.unit.value;
        request.title = ctls.title.value;
        this.userService.updateTeacher(this.userService.GetCurrentUser().id, request).subscribe(
          dt => {
            this.editUserSuccess = true;
            this.userService.updateCurrentUserInfo();
            setTimeout(() => this.editUserSuccess = false, 5000);
          }, err => {
            this.editResponseErrorMessage = err.error.message;
            this.editResponseError = true;
          }
        );
      }
    }
  }
}
