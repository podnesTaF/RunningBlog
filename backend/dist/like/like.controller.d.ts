import { LikeService } from "./like.service";
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    getPostLikes(id: string): Promise<import("./entities/like.entity").LikeEntity[]>;
    addLike(req: any, body: {
        postId: number;
    }): Promise<{
        user: {
            id: number;
        };
        post: {
            id: number;
        };
    } & import("./entities/like.entity").LikeEntity>;
    removeLike(req: any, id: string): Promise<import("typeorm").DeleteResult>;
}
