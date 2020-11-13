import { Attachment } from '../../Attachment';
import { TaskBrief } from './TaskBrief';

export class Task {
    id: number;
    name: string;
    description: string;
    learningTimeHours: number;
    learningTimeMinutes: number;
    dueDate: Date;
    courseId: number;
    previousTasks: TaskBrief[];
    nextTasks: TaskBrief[];
    attachments: Attachment[];
}