import { Attachment } from '../../Attachment';
import { User } from '../../User';
import { PostVisibility } from './PostVisibility';

export class Post {
    id: number;
    courseId: number;
    content: string;
    author: User;
    publicationTime: Date;
    postVisibility: PostVisibility;
    commentingAllowed: boolean;
    attachments: Attachment[];
    commentCount: number;
}
