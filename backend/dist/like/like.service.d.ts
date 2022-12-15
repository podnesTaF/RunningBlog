import { Repository } from "typeorm";
import { LikeEntity } from "./entities/like.entity";
export declare class LikeService {
    private repository;
    constructor(repository: Repository<LikeEntity>);
    addLike(userId: number, postId: number): Promise<{
        user: {
            id: number;
        };
        post: {
            id: number;
        };
    } & LikeEntity>;
    removeLike(userId: number, postId: number): Promise<import("typeorm").DeleteResult>;
    getPostLikes(postId: number): Promise<LikeEntity[]>;
}
