import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.css']
})
export class ErrorBarComponent implements OnInit, AfterViewInit {

  @Input() errorMessage: string;
  @ViewChild('errorDiv') errorDiv: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    const height = this.errorDiv.nativeElement.offsetTop + this.errorDiv.nativeElement.offsetHeight - 60;
    window.scroll(0, height);
  }

  ngOnInit(): void {
  }

}
