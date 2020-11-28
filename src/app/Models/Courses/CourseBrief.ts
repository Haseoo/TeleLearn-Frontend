import { Teacher } from '../Teacher';

export class CourseBrief {
    id: number;
    name: string;
    owner: Teacher;
    isAutoAccept: boolean;
}
