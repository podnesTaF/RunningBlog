import { CommentEntity } from '../../comment/entities/comment.entity';
import { FollowsEntity } from "../../follows/entities/follows.entity";
import { LikeEntity } from "../../like/entities/like.entity";
import { PostEntity } from "../../post/entities/post.entity";
import { ConversationEntity } from "../../conversation/entities/conversation.entity";
import { MessageEntity } from "../../messages/entities/message.entity";
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
    conversationsAsSender: ConversationEntity[];
    conversationsAsReceiver: ConversationEntity[];
    messages: MessageEntity[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
