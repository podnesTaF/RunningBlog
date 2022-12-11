import { UserEntity } from "../../user/entities/user.entity";
export declare class FollowsEntity {
    id: number;
    following: UserEntity;
    follower: UserEntity;
}
