import { Task } from './Task';

export class TaskForStudent extends Task {
    taskCompletion: number;
    isToRepeat: boolean;
    courseName: string;
    isLearnable: boolean;
}
