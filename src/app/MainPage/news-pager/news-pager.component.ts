import { Component, OnInit } from '@angular/core';
import { NewsBrief } from 'src/app/Models/NewsBrief';

@Component({
  selector: 'app-news-pager',
  templateUrl: './news-pager.component.html',
  styleUrls: ['./news-pager.component.css']
})
export class NewsPagerComponent implements OnInit {

  collection:NewsBrief[] = [];
  current:number = 0;
  perPage:number = 10;
  total:number = 7;

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.collection.push(this.getNews(i));
    }
  }

  ngOnInit(): void {
  }

  PageChanged(newPage:number): void {
    console.log(newPage);
    this.current = newPage;
    this.collection = [];
    for (let i = 1; i <= this.perPage; i++) {
      this.collection.push(this.getNews(i + (newPage - 1) * 10));
    }
  }

  private getNews(no:number):NewsBrief {
    let ret = new NewsBrief();
    ret.id=no;
    ret.title = 'Artykuł ' + no;
    ret.publicationDate = new Date();
    ret.author = 'Admin';
    ret.isMore = no % 2 === 0;
    ret.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed interdum ipsum. Ut volutpat sed urna eget elementum. Sed lorem lorem, tempor sit amet orci et, sodales finibus diam. Etiam semper tincidunt nulla, in aliquam nibh sodales et. Duis tristique justo ut arcu dictum molestie. Suspendisse vehicula justo sapien, sit amet pellentesque mi bibendum sed. Phasellus et accumsan ipsum. Vivamus ut bibendum tellus, eget efficitur ante.';
    return ret;
  }
}
