import { UserEntity } from "../../user/entities/user.entity";
import { PostEntity } from "../../post/entities/post.entity";
export declare class LikeEntity {
    id: number;
    user: UserEntity;
    post: PostEntity;
}
