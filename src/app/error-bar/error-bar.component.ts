import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.css']
})
export class ErrorBarComponent implements OnInit {

  @Input() errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
