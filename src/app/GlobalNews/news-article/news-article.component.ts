import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { UserRole } from 'src/app/Models/UserRole';
import { GlobalNewsService } from 'src/app/Services/global-news.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
  styles: []
})
export class NewsArticleComponent implements OnInit, IError {

  article: GlobalNews;
  error: boolean;
  errorMessage: string;
  deleteSuccess: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: GlobalNewsService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.newsService.getAricle(params.id).subscribe(
        dt => this.article = dt,
        err => {
          Utils.HandleError(this, err);
        }
      );
    });
  }

  ShowManagement(): boolean {
    return this.userService.IsCurrentUserAdmin();
  }

  OnDelete() {
    if (confirm(`Jesteś pewny, że chcesz usunąć artykuł ${this.article.title}?`)) {
      this.newsService.deleteArticle(this.article.id).subscribe(
        dt => {
          this.deleteSuccess = true;
          this.article = null;
        },
        err => {
          Utils.HandleError(this, err);
        }
      );
    }
  }

}
