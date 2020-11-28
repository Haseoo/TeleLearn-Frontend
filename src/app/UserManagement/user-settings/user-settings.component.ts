import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordChangeRequest } from 'src/app/Models/Requests/PasswordChangeRequest';
import { StudentUpdateRequest } from 'src/app/Models/Requests/StudentUpdateRequest';
import { TeacherUpdateRequest } from 'src/app/Models/Requests/TeacherUpdateRequest';
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


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    const group: any = {
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      unit: [''],
      title: ['']
    };

    if (this.IsStudent()) {
      group.minutesInterval = ['0', [Validators.min(0), Validators.max(59)]];
      group.hoursInterval = ['0', [Validators.min(0), Validators.max(23)]];
    }
    this.userEditForm = this.formBuilder.group(group);

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGHT)]]
    });

    if (this.IsStudent()) {
      this.userService.getStudent(this.userService.GetCurrentUser().id).subscribe(
        dt => {
          this.userEditForm.patchValue({
            name: dt.name,
            surname: dt.surname,
            email: dt.email,
            unit: dt.unit,
            minutesInterval: dt.dailyLearningTime.minutes,
            hoursInterval: dt.dailyLearningTime.hours
          });
        },
        err => {
          this.editResponseError = true;
          this.editResponseErrorMessage = (err.error.message) ? err.error.message : err.message;
        }
      );
    } else if (this.IsTeacher()) {
      this.userService.getTeacher(this.userService.GetCurrentUser().id).subscribe(
        dt => {
          this.userEditForm.patchValue({
            name: dt.name,
            surname: dt.surname,
            email: dt.email,
            unit: dt.unit,
            title: dt.title
          });
        },
        err => {
          this.editResponseError = true;
          this.editResponseErrorMessage = (err.error.message) ? err.error.message : err.message;
        }
      );
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
      const request = new PasswordChangeRequest(this.passwordForm.controls.oldPassword.value,
        this.passwordForm.controls.newPassword.value);
      this.userService.changePassword(this.userService.GetCurrentUser().id, request).subscribe (
        dt => {
            this.passwordResponseError = false;
            this.passwordChangeSuccess = true;
            this.passwordForm.reset();
            this.passwordSubmitted = false;
            setTimeout(() => this.passwordChangeSuccess = false, 5000);
        }, err => {
          this.passwordResponseErrorMessage = (err.error.message) ? err.error.message : err.message;
          this.passwordResponseError = true;
        }
      );
    }
  }

  UserEditSubmit() {
    this.userEditSubmitted = true;
    if (this.userEditForm.valid) {
      if (this.IsStudent()) {
        const request = new StudentUpdateRequest();
        const ctls = this.userEditForm.controls;
        request.email = ctls.email.value;
        request.name = ctls.name.value;
        request.surname = ctls.surname.value;
        request.unit = ctls.unit.value;
        request.hours = ctls.hoursInterval.value;
        request.minutes = ctls.minutesInterval.value;
        this.userService.updateStudent(this.userService.GetCurrentUser().id, request).subscribe(
          dt => {
            this.editResponseError = false;
            this.editUserSuccess = true;
            this.userService.updateCurrentUserInfo();
            this.userEditSubmitted = false;
            setTimeout(() => this.editUserSuccess = false, 5000);
          }, err => {
            this.editResponseErrorMessage = (err.error.message) ? err.error.message : err.message;
            this.editResponseError = true;
          }
        );
      } else if (this.IsTeacher()) {
        const request = new TeacherUpdateRequest();
        const ctls = this.userEditForm.controls;
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
            this.editResponseErrorMessage = (err.error.message) ? err.error.message : err.message;
            this.editResponseError = true;
          }
        );
      }
    }
  }

  IsTeacher(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.TEACHER];
  }

  IsStudent(): boolean {
    return this.userService.GetCurrentUser().userRole.toString() === UserRole[UserRole.STUDENT];
  }
}
