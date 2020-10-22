import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-pager',
  templateUrl: './news-pager.component.html',
  styleUrls: ['./news-pager.component.css']
})
export class NewsPagerComponent implements OnInit {

  constructor() { }

  numberOfPages:number = 150;
  currentPage:number = 0;

  ngOnInit(): void {
  }

}
