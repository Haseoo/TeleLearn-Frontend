import { Time } from './Time';
import { User } from './User';

export class Student extends User {
    unit: string;
    dailyLearningTime: Time;
}
