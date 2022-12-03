import { UserEntity } from '../../user/entities/user.entity';
import { PostEntity } from '../../post/entities/post.entity';
export declare class CommentEntity {
    id: number;
    text: string;
    user: UserEntity;
    post: PostEntity;
    createdAt: Date;
    updatedAt: Date;
}
