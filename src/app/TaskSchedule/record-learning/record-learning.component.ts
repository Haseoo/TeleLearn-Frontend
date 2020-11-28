import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskSchedule } from 'src/app/Models/Courses/Tasks/TaskSchedule';
import { Time } from 'src/app/Models/Time';

@Component({
  selector: 'app-record-learning',
  templateUrl: './record-learning.component.html',
  styleUrls: ['./record-learning.component.css', '../../../form-style.css']
})
export class RecordLearningComponent implements OnInit {

  @Input() schedule: TaskSchedule;
  @Input() defaultTime: Time;
  @Input() startTime: string;
  @Output() apply = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startTime: [(this.startTime) ? this.startTime : this.schedule.scheduleTime , [Validators.required]],
      hours: [this.defaultTime.hours, [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [this.defaultTime.minutes, [Validators.required, Validators.min(0), Validators.max(59)]],
      progress: [this.schedule.task.taskCompletion, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get ctls() {
    return this.form.controls;
  }

  OnSubmit() {
    if (this.form.valid) {
      this.apply.emit(this.form.value);
    }
  }

}
