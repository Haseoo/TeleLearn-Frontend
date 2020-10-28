import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-bar',
  templateUrl: './success-bar.component.html',
  styleUrls: ['./success-bar.component.css']
})
export class SuccessBarComponent implements OnInit {

  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
