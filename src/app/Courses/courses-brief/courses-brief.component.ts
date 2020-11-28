import { Component, Input, OnInit } from '@angular/core';
import { CourseBrief } from 'src/app/Models/Courses/CourseBrief';

@Component({
  selector: 'app-courses-brief',
  templateUrl: './courses-brief.component.html',
  styleUrls: ['./courses-brief.component.css']
})
export class CoursesBriefComponent implements OnInit {

  @Input() courseBriefs: CourseBrief[] = [];
  @Input() showOwner = true;
  @Input() current = 1;
  @Input() perPage = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
