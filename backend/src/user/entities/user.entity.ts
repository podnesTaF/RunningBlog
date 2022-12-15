import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, BeforeInsert,
} from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';
import {FollowsEntity} from "../../follows/entities/follows.entity";
import {LikeEntity} from "../../like/entities/like.entity";
import {PostEntity} from "../../post/entities/post.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({nullable: true})
  image: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    eager: false,
    nullable: true,
  })
  comments: CommentEntity[];



  @OneToMany(() => FollowsEntity, follows => follows.following)
  followers: FollowsEntity[];

  @OneToMany(() => FollowsEntity, follows => follows.follower)
  followings: FollowsEntity[];

  @OneToMany(() => LikeEntity, like => like.user)
  likes: LikeEntity[];

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
