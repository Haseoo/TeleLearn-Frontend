import { User } from './User';

export class GlobalNews {
    id: number;
    title: string;
    publicationDate: Date;
    brief: string;
    author: User;
    htmlContent: string;
    more: boolean;
}
