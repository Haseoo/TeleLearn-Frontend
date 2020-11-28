import { Component, OnInit } from '@angular/core';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { GlobalNewsService } from 'src/app/Services/global-news.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-news-pager',
  templateUrl: './news-pager.component.html',
  styleUrls: ['./news-pager.component.css']
})
export class NewsPagerComponent implements OnInit, IError {

  collection: GlobalNews[] = [];
  current = 1;
  perPage = 10;
  total = 0;
  error: boolean;
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
        Utils.HandleError(this, err);
      }
    );
  }

  PageChanged(page: number): void {
    this.current = page;
    this.getPage();
  }
}
