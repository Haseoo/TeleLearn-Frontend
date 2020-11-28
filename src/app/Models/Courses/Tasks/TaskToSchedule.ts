import { Time } from '../../Time';
import { TaskForStudent } from './TaskForStudent';

export class TaskToSchedule {
    task: TaskForStudent;
    totalLearningTime: Time;
    totalPlannedLearningTime: Time;
}
