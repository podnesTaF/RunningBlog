import { FollowsService } from "./follows.service";
export declare class FollowsController {
    private readonly followsService;
    constructor(followsService: FollowsService);
    getFollows(): Promise<{
        id: number;
        followingId: import("../user/entities/user.entity").UserEntity;
        followerId: import("../user/entities/user.entity").UserEntity;
    }[]>;
    addFollows(req: any, res: {
        id: number;
    }): Promise<import("../user/entities/user.entity").UserEntity>;
    getFollow(id: string): Promise<{
        following: import("../user/entities/user.entity").UserEntity;
        follower: import("../user/entities/user.entity").UserEntity;
        id: number;
    }>;
    unfollow(req: any, id: string): Promise<import("typeorm").DeleteResult>;
}
