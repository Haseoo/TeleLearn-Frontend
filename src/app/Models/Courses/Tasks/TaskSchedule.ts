import { Time } from '../../Time';
import { Task } from './Task';

export class TaskSchedule {
    id : number;
    date: Date;
    plannedTime: Time;
    learningTime: Time;
    student: Time;
    task: Task;
}