import { TimerPause } from './TimerPause';
import { TimerState } from './TimerState';

export class LearnTimer {
    scheduleId: number;
    start: number;
    stop: number;
    pauses: TimerPause[] = [];
}
