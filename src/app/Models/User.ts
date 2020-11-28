import { UserRole } from './UserRole';

export class User {
    id: number;
    login: string;
    name: string;
    surname: string;
    email: string;
    userRole: UserRole;
}
