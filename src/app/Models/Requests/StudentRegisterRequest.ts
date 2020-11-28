export class StudentRegisterRequest {
    username: string;
    password: string[];
    email: string;
    name: string;
    surname: string;
    unit: string;


    constructor(username: string,
                password: string,
                email: string,
                name: string,
                surname: string,
                unit: string) {

            this.username = username;
            this.password = password.split('');
            this.email = email;
            this.name = name;
            this.surname = surname;
            this.unit = unit;
    }
}
