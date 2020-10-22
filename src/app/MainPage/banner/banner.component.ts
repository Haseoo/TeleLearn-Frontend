import { Component, OnInit } from '@angular/core';
import { APP_NAME } from '../../constants'


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  appName = APP_NAME;

}
