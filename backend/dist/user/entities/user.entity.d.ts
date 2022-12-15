import { CommentEntity } from '../../comment/entities/comment.entity';
import { FollowsEntity } from "../../follows/entities/follows.entity";
import { LikeEntity } from "../../like/entities/like.entity";
import { PostEntity } from "../../post/entities/post.entity";
export declare class UserEntity {
    id: number;
    fullName: string;
    email: string;
    image: string;
    comments: CommentEntity[];
    followers: FollowsEntity[];
    followings: FollowsEntity[];
    likes: LikeEntity[];
    posts: PostEntity[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
