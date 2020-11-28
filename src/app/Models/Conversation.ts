import { User } from './User';

export class Conversation {
    participant: User;
    messageCount: number;
    unreadMessageCount: number;
    lastMessageTime: Date;
}
