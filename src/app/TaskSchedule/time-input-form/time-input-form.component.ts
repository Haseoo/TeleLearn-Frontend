import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from 'src/app/Models/Time';

@Component({
  selector: 'app-time-input-form',
  templateUrl: './time-input-form.component.html',
  styleUrls: ['./time-input-form.component.css', '../../../form-style.css']
})
export class TimeInputFormComponent implements OnInit {

  @Input() time: Time;
  @Input() labelText: string;
  @Output() apply = new EventEmitter<Time>();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      minutes: [(this.time) ? this.time.minutes : 0, [Validators.required, Validators.min(0), Validators.max(59)]],
      hours: [(this.time) ? this.time.hours : 0, [Validators.required, Validators.min(0), Validators.max(23)]],
    });
  }

  OnSubmit() {
    if (this.form.valid) {
      this.apply.emit(this.form.value);
    }
  }


}
