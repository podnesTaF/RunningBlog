import { CommentEntity } from '../../comment/entities/comment.entity';
import { FollowsEntity } from "../../follows/entities/follows.entity";
export declare class UserEntity {
    id: number;
    fullName: string;
    email: string;
    image: string;
    comments: CommentEntity[];
    followers: FollowsEntity[];
    followings: FollowsEntity[];
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}
