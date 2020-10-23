import { Component, Input, OnInit } from '@angular/core';
import { GlobalNews } from 'src/app/Models/GlobalNews';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input() news:GlobalNews;

  constructor() { }

  ngOnInit(): void {
  }

}
