import { Component, Input, OnInit } from '@angular/core';
import { NewsBrief } from 'src/app/Models/NewsBrief';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input() news:NewsBrief;

  constructor() { }

  ngOnInit(): void {
  }

}
