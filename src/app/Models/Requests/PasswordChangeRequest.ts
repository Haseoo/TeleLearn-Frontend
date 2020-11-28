export class PasswordChangeRequest {
    oldPassword: string[];
    newPassword: string[];

    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword.split('');
        this.newPassword = newPassword.split('');
    }
}
