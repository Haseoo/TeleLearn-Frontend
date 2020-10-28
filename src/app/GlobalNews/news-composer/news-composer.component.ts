import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalNews } from 'src/app/Models/GlobalNews';
import { GlobalNewsService } from 'src/app/Services/global-news.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-news-composer',
  templateUrl: './news-composer.component.html',
  styleUrls: ['./news-composer.component.css', './../../../form-style.css']
})
export class NewsComposerComponent implements OnInit {

  article: GlobalNews;
  responseError: boolean;
  responseErrorMessage: string;
  editSuccess: boolean;

  newsForm: FormGroup;
  submited: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private newsService: GlobalNewsService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      publicationDate: [''],
      brief: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.newsService.getAricle(params.id).subscribe(
          dt => {
            this.article = dt;
            this.newsForm.patchValue({
              title: dt.title,
              publicationDate: new Date(dt.publicationDate).toISOString().substring(0, 16),
              brief: dt.brief
            });
          },
          err => {
            this.responseErrorMessage = err.error.message;
            this.responseError = true;
          }
        )
      }
    })
  }

  get ctls() {
    return this.newsForm.controls;
  }

  Submit() {

  }

}
