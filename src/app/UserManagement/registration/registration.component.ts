import { Component, OnInit } from '@angular/core';
import { RegisterationMode } from './RegisterationMode';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', './../../../form-style.css']
})
export class RegistrationComponent implements OnInit {

  mode: RegisterationMode = RegisterationMode.STUDENT;
  ACTIVE_OPTIONS = RegisterationMode;

  constructor() { }

  ngOnInit(): void {
  }

}
