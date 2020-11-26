import { Component, OnInit } from '@angular/core';
import { StudentStat } from 'src/app/Models/StudentStat';
import { Time } from 'src/app/Models/Time';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  error: boolean;
  errorMessage: string;

  isAllDays: boolean = true;

  stats: StudentStat;

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    this.userSerivce.GetStudentStats(this.userSerivce.GetCurrentUser().id).subscribe(
      dt => this.stats = dt,
      err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.error = true;
      }
    )
  }

  GetTimeDescription(time: Time): string {
    return `${time.hours} godzin${this.GetHourSuffix(time.hours)} i ${time.minutes} minut${this.GetMinuteSuffix(time.minutes)}`
  }

  GetHourSuffix(hours: number): string {
    let lastDigit = hours % 10;
    if (hours == 1) {
      return 'a';
    } else if (lastDigit > 1 && lastDigit < 5) {
      return 'y';
    }
    return '';
  }

  GetMinuteSuffix(minute: number): string {
    let lastDigit = minute % 10;
    if (minute == 1) {
      return 'a';
    } else if(minute > 10 && lastDigit == 1) {
      return ''
    } else if (minute > 10 && minute < 20) {
      return '';
    }
    else if (lastDigit > 1 && lastDigit < 5) {
      return 'y';
    }
    return '';
  }

}
