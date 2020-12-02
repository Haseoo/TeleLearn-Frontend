import { CourseBrief } from './Courses/CourseBrief';
import { Time } from './Time';

export class StudentStat {
    taskTimeForWeek: Time;
    plannedTimeForWeek: Time;
    learningTimeForWeek: Time;
    learningTimeForCourseSevenDays: any;
    learningTimeForCourseTotal: any;
    hoursLearningStats: Map<number, number>;
    averageLearningTime: Time;
}
