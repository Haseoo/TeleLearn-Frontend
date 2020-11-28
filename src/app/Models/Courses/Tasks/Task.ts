import { Attachment } from '../../Attachment';
import { Time } from '../../Time';
import { TaskBrief } from './TaskBrief';

export class Task {
    id: number;
    name: string;
    description: string;
    learningTime: Time;
    dueDate: Date;
    courseId: number;
    previousTasks: TaskBrief[];
    nextTasks: TaskBrief[];
    attachments: Attachment[];
}
