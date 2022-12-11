import {
    Column,
    Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from "../../user/entities/user.entity";

@Entity('follows')
export class FollowsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.followers)
    following: UserEntity;

    @ManyToOne(() => UserEntity, user => user.followings)
    follower: UserEntity;
}