import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { GlobalNewsRequest } from 'src/app/Models/Requests/GlobalNewsRequest';
import { GlobalNewsService } from 'src/app/Services/global-news.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-news-composer',
  templateUrl: './news-composer.component.html',
  styleUrls: ['./news-composer.component.css', './../../../form-style.css']
})
export class NewsComposerComponent implements OnInit, IError {

  article: GlobalNews;
  error: boolean;
  errorMessage: string;
  editSuccess: boolean;

  newsForm: FormGroup;
  submited: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private newsService: GlobalNewsService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      publicationDate: [''],
      brief: [''],
      htmlContent: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.newsService.getAricle(params.id).subscribe(
          dt => {
            this.article = dt;
            this.newsForm.patchValue({
              title: dt.title,
              publicationDate: new Date(dt.publicationDate).toISOString().substring(0, 16),
              brief: dt.brief,
              htmlContent : dt.htmlContent
            });
          },
          err => {
            Utils.HandleError(this, err);
          }
        );
      }
    });
  }

  get ctls() {
    return this.newsForm.controls;
  }

  Submit() {
    this.submited = true;
    if (this.newsForm.valid) {
      const request = new GlobalNewsRequest();
      const data = this.newsForm.value;
      request.authorId = this.userService.GetCurrentUser().id;
      request.title = data.title;
      request.brief = data.brief;
      request.htmlContent = data.htmlContent;
      request.publicationDate = (data.publicationDate) ?
        new Date(data.publicationDate) : new Date();
      if (!this.article) {
        this.newsService.addArticle(request).subscribe(
          dt => {
            const id = Utils.GetIdFromLocationUrl(dt.headers.get('Location'));
            this.router.navigate([`/news/${id}`]);
          },
          err => {
            Utils.HandleError(this, err);
          }
        );
      } else {
        this.newsService.updateArticle(this.article.id, request).subscribe(
          () => {
            this.router.navigate([`/news/${this.article.id}`]);
          },
          err => {
            Utils.HandleError(this, err);
          }
        );
      }
    }
  }

}
