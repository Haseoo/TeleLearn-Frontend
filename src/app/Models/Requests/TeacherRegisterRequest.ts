export class TeacherRegisterRequest {
    username: string;
    password: string[];
    email: string;
    name: string;
    surname: string;
    unit: string;
    title: string;

    constructor(username: string,
                password: string,
                email: string,
                name: string,
                surname: string,
                unit: string,
                title: string) {

            this.username = username;
            this.password = password.split('');
            this.email = email;
            this.name = name;
            this.surname = surname;
            this.unit = unit;
            this.title = title;
    }
}
