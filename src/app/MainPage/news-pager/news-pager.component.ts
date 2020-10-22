import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-pager',
  templateUrl: './news-pager.component.html',
  styleUrls: ['./news-pager.component.css']
})
export class NewsPagerComponent implements OnInit {

  collection = [];
  current: number = 0;
  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
  }

  PageChanged(newPage:number): void {
    console.log(newPage);
    this.current = newPage;
    this.collection = [];
    for (let i = 1; i <= 10; i++) {
      this.collection.push(`item ${i + (newPage - 1) * 10}`);
    }
  }

}
