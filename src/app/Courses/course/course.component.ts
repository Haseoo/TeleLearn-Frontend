import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let courseId = params['id'];
        if (!courseId) {
          this.errorMessage = 'Nie podano id kursu';
          this.error = true;
        }
      }
    )
  }

}
