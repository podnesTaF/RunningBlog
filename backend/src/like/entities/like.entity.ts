import {
    Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from "../../user/entities/user.entity";
import {PostEntity} from "../../post/entities/post.entity";

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.likes, {onDelete:'CASCADE'})
    user: UserEntity;

    @ManyToOne(() => PostEntity, post => post.likes, {onDelete:'CASCADE'})
    post: PostEntity;
}