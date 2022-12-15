import { Repository } from "typeorm";
import { FollowsEntity } from "./entities/follows.entity";
import { CreateFollowsDto } from "./dto/create-follows.dto";
export declare class FollowsService {
    private repository;
    constructor(repository: Repository<FollowsEntity>);
    getFollows(): Promise<{
        id: number;
        followingId: import("../user/entities/user.entity").UserEntity;
        followerId: import("../user/entities/user.entity").UserEntity;
    }[]>;
    getFollow(id: number): Promise<{
        following: import("../user/entities/user.entity").UserEntity;
        follower: import("../user/entities/user.entity").UserEntity;
        id: number;
    }>;
    addFollows(dto: CreateFollowsDto): Promise<import("../user/entities/user.entity").UserEntity>;
    unfollow(userId: number, unfollowId: number): Promise<import("typeorm").DeleteResult>;
}
