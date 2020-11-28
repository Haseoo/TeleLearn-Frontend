import { User } from '../../User';

export class Comment {
    id: number;
    author: User;
    publicationTime: Date;
    content: string;
}
