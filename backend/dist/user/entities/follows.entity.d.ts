import { UserEntity } from "./user.entity";
export declare class FollowsEntity {
    id: number;
    following: UserEntity;
    follower: UserEntity;
}
