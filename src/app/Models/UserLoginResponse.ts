import { UserRole } from './UserRole';

export class UserLoginResponse {
    token: string;
    id: number;
    login: string;
    name: string;
    surname: string;
    userRole: UserRole;
}
