import { Student } from '../../Student';
import { Time } from '../../Time';
import { TaskFroStudent } from './TaskForStudent';

export class TaskSchedule {
    id : number;
    date: Date;
    plannedTime: Time;
    learningTime: Time;
    student: Student;
    task: TaskFroStudent;
}