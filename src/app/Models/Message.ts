import { User } from './User';

export class Message {
    receiver: User;
    sender: User;
    content: string;
    sendTime: Date;
}
