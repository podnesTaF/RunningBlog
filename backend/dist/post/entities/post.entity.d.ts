import { UserEntity } from '../../user/entities/user.entity';
export declare class PostEntity {
    id: number;
    title: string;
    text: string;
    image: string;
    description: string;
    user: UserEntity;
    views: number;
    tags?: string;
    createdAt: Date;
    updatedAt: Date;
}
