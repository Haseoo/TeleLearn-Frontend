import { CourseBrief } from './Courses/CourseBrief';
import { Time } from './Time';

export class StudentStat {
    taskTimeForWeek: Time;
    plannedTimeForWeek: Time;
    learningTimeForWeek: Time;
    learningTimeForCourseSevenDays: Map<CourseBrief, Time>;
    learningTimeForCourseTotal: Map<CourseBrief, Time>;
    hoursLearningStats: Map<number, number>;
    averageLearningTime: Time;
}