import { Component, OnInit } from '@angular/core';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { GlobalNewsService } from 'src/app/Services/global-news.service';

@Component({
  selector: 'app-news-pager',
  templateUrl: './news-pager.component.html',
  styleUrls: ['./news-pager.component.css']
})
export class NewsPagerComponent implements OnInit {

  collection: GlobalNews[] = [];
  current: number = 1;
  perPage: number = 10;
  total: number = 0;
  fetchError: boolean;
  errorMessage: string;

  constructor(private globalNewsService: GlobalNewsService) {
  }

  ngOnInit(): void {
    this.getPage();
  }

  private getPage() {
    this.globalNewsService.getBriefs(this.current - 1, this.perPage).subscribe(
      dt => {
        this.collection = dt.content;
        this.total = dt.totalItems;
      },
      err => {
        console.error(err);
        this.fetchError = true;
        this.errorMessage = err.message;
      }
    );
  }

  PageChanged(page: number): void {
    this.current = page;
    this.getPage();
  }
}
