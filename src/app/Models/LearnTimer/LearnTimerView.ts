import { LearnTimer } from './LearnTimer';
import { TimerState } from './TimerState';

export class LearnTimerView {
    scheduleId: number;
    value: number;
    state: TimerState;
    start: number;

    constructor(timer: LearnTimer) {
        this.scheduleId = timer.scheduleId;
        this.start = timer.start;
        if (timer.stop) {
            this.state = TimerState.STOPPED;
        } else if (timer.pauses.length === 0 ||
            (timer.pauses.length > 0 && timer.pauses[timer.pauses.length - 1].stop)) {
            this.state = TimerState.RUNNING;
        } else {
            this.state = TimerState.PAUSED;
        }
        const duration = ((timer.stop) ? timer.stop : Date.now()) - timer.start;
        const pausesDuration = timer.pauses
            .map(pause => ((pause.stop) ? pause.stop : Date.now()) - pause.start)
            .reduce((a, v) => a + v, 0);
        this.value = duration - pausesDuration;
    }
}
