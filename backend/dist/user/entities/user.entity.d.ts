import { CommentEntity } from '../../comment/entities/comment.entity';
export declare class UserEntity {
    id: number;
    fullName: string;
    email: string;
    comments: CommentEntity[];
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}
