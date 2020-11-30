import { Student } from '../../Student';
import { Time } from '../../Time';
import { TaskForStudent } from './TaskForStudent';

export class TaskSchedule {
    id: number;
    date: Date;
    plannedTime: Time;
    learningTime: Time;
    student: Student;
    task: TaskForStudent;
    scheduleTime: string;
    endScheduleTime: string;
    isOverlap: boolean;
}
