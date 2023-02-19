import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/searchg-user.dto';
import { CommentEntity } from '../comment/entities/comment.entity';
import { FollowsEntity } from "../follows/entities/follows.entity";
import { LikeEntity } from "../like/entities/like.entity";
import { PostEntity } from "../post/entities/post.entity";
export declare class UserService {
    private repository;
    constructor(repository: Repository<UserEntity>);
    create(dto: CreateUserDto): Promise<{
        follows: any[];
        followers: any[];
        fullName: string;
        email: string;
        password?: string;
        image: string;
    } & UserEntity>;
    findAll(): Promise<{
        runningDistance: number;
        cycleDistance: number;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: CommentEntity[];
        followers: FollowsEntity[];
        followings: FollowsEntity[];
        likes: LikeEntity[];
        posts: PostEntity[];
        conversationsAsSender: import("../conversation/entities/conversation.entity").ConversationEntity[];
        conversationsAsReceiver: import("../conversation/entities/conversation.entity").ConversationEntity[];
        messages: import("../messages/entities/message.entity").MessageEntity[];
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: number): Promise<{
        lastActivity: PostEntity;
        runningDistance: number;
        cycleDistance: number;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: CommentEntity[];
        followers: FollowsEntity[];
        followings: FollowsEntity[];
        likes: LikeEntity[];
        posts: PostEntity[];
        conversationsAsSender: import("../conversation/entities/conversation.entity").ConversationEntity[];
        conversationsAsReceiver: import("../conversation/entities/conversation.entity").ConversationEntity[];
        messages: import("../messages/entities/message.entity").MessageEntity[];
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByCond(cond: LoginUserDto): Promise<UserEntity>;
    update(id: number, dto: UpdateUserDto): Promise<UserEntity>;
    search(dto: SearchUserDto): Promise<{
        items: UserEntity[];
        total: number;
    }>;
}
