import { Injectable } from '@angular/core';
import { LearnTimer } from '../Models/LearnTimer/LearnTimer';
import { LearnTimerView } from '../Models/LearnTimer/LearnTimerView';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LearnTimerService {

  constructor(private userService: UserService) { }

  private _getTimerMap(): Map<number, LearnTimer> {
    let map = JSON.parse(localStorage.getItem('timers'));
    if (!map) {
      map = new Map<number, LearnTimer>();
      localStorage.setItem('timers', JSON.stringify(map));
    }
    return map;
  }

  private _getUserTimer(): LearnTimer {
    return this._getTimerMap()[this.userService.GetCurrentUser().id];
  }

  private _saveTimer(timer: LearnTimer) {
    const map = this._getTimerMap();
    map[this.userService.GetCurrentUser().id] = timer;
    localStorage.setItem('timers', JSON.stringify(map));
  }

  SetTimer(scheduleId: number): boolean {
    if (this._getUserTimer()) {
      return false;
    }
    const timer = new LearnTimer();
    timer.start = Date.now();
    timer.scheduleId = scheduleId;
    this._saveTimer(timer);
    return true;
  }

  PauseTimer(): boolean {
    const timer = this._getUserTimer();
    if (!timer) {
      return false;
    }
    if (timer.pauses.length > 0 && !timer.pauses[timer.pauses.length - 1].stop) {
      return false;
    }
    timer.pauses.push({start: Date.now(), stop: null});
    this._saveTimer(timer);
    return true;
  }

  ResumeTimer(): boolean {
    const timer = this._getUserTimer();
    if (!timer) {
      return false;
    }
    const lastPause = timer.pauses[timer.pauses.length - 1];
    if (!lastPause || !lastPause.start || lastPause.stop) {
      return false;
    }
    lastPause.stop = Date.now();
    this._saveTimer(timer);
    return true;
  }

  stopTimer(): boolean {
    const timer = this._getUserTimer();
    if (!timer) {
      return false;
    }
    if (timer.stop) {
      return false;
    }
    timer.stop = Date.now();
    timer.pauses[timer.pauses.length - 1].stop = timer.stop;
    this._saveTimer(timer);
    return true;
  }

  getTimer(): LearnTimerView {
    const timer = this._getUserTimer();
    if (timer) {
      return new LearnTimerView(timer);
    }
    return null;
  }

  RemoveTimer() {
    const timers = this._getTimerMap();
    timers[this.userService.GetCurrentUser().id] = null;
    localStorage.setItem('timers', JSON.stringify(timers));
  }
}
