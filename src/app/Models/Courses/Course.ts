import { Student } from '../Student';
import { CourseBrief } from './CourseBrief';

export class Course extends CourseBrief {
    welcomePageHtmlContent: string;
    areStudentsAllowedToPost: boolean;
    allowedStudents: Student[];
    requestedStudents: Student[];
    isPublicCourse: boolean;
}
