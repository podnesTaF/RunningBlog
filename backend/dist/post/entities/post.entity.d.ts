import { UserEntity } from '../../user/entities/user.entity';
import { LikeEntity } from "../../like/entities/like.entity";
export declare class PostEntity {
    id: number;
    type: 'running' | 'cycle';
    distance: number;
    duration: number;
    title: string;
    text: string;
    image: string;
    description: string;
    likes: LikeEntity[];
    userId: number;
    user: UserEntity;
    views: number;
    tags?: string;
    createdAt: Date;
    updatedAt: Date;
}
