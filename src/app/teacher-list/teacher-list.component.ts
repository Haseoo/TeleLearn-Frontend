import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from '../Models/Teacher';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css', './../../form-style.css']
})
export class TeacherListComponent implements OnInit {
  error: boolean;
  errorMessage: string;
  perPage: number = 20;
  current: number = 1;

  formVisible: boolean = false;
  filterForm: FormGroup;

  private _teachers: Teacher[];
  displayedTeachers: Teacher[];

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.GetTeachers().subscribe(
      dt => {
        this._teachers = dt;
        this.displayedTeachers = dt;
        this._SortDisplayed();
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    );
    this.filterForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      unit: ['']
    });
  }

  OnRowClick(id: number) {
    this.router.navigate([`/user/${id}`], {queryParams: { backUrl: this.router.url } });
  }

  OnRowMiddleClick(id: number, event: MouseEvent) {
    if (event.button === 1) {
      window.open(`/user/${id}`);
    }
  }

  Submit() {
    this.formVisible = false;
    let ctls = this.filterForm.controls;
    let result = [...this._teachers];
    if (ctls.name.value) {
      result = result.filter(e => e.name.toUpperCase() === ctls.name.value.toUpperCase());
    }
    if (ctls.surname.value) {
      result = result.filter(e => e.surname.toUpperCase() === ctls.surname.value.toUpperCase());
    }

    if (ctls.unit.value) {
      result = result.filter(e => e.unit.toUpperCase().includes(ctls.unit.value.toUpperCase()));
    }

    this.displayedTeachers = result;
  }

  ResetFilter() {
    this.filterForm.reset;
    this.displayedTeachers = this._teachers;
    this.formVisible = false;
  }


  private _SortDisplayed() {
    this.displayedTeachers.sort(this._TeacherCompare);
  }

  private _TeacherCompare(teacher1: Teacher, teacher2: Teacher) {
    if (teacher1.surname < teacher2.surname) {
      return -1;
    }
    if (teacher1.surname < teacher2.surname) {
      return 1;
    }
    if (teacher1.name < teacher2.name) {
      return -1;
    }
    if (teacher1.name < teacher2.name) {
      return 1;
    }
    return 0;
  }

}