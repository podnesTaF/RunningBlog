import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import {LikeEntity} from "../../like/entities/like.entity";

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  description: string;

  @OneToMany(() => LikeEntity, like => like.post)
  likes: LikeEntity[];

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;


  @Column({
    default: 0,
  })
  views: number;

  @Column({ nullable: true })
  tags?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
