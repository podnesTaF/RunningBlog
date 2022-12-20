import { UserService } from './user.service';
import { SearchUserDto } from './dto/searchg-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        runningDistance: number;
        cycleDistance: number;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followers: import("../follows/entities/follows.entity").FollowsEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        likes: import("../like/entities/like.entity").LikeEntity[];
        posts: import("../post/entities/post.entity").PostEntity[];
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfile(req: any): Promise<{
        lastActivity: import("../post/entities/post.entity").PostEntity;
        runningDistance: number;
        cycleDistance: number;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followers: import("../follows/entities/follows.entity").FollowsEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        likes: import("../like/entities/like.entity").LikeEntity[];
        posts: import("../post/entities/post.entity").PostEntity[];
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(req: any, body: any): Promise<import("./entities/user.entity").UserEntity>;
    search(dto: SearchUserDto): Promise<{
        items: import("./entities/user.entity").UserEntity[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        lastActivity: import("../post/entities/post.entity").PostEntity;
        runningDistance: number;
        cycleDistance: number;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followers: import("../follows/entities/follows.entity").FollowsEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        likes: import("../like/entities/like.entity").LikeEntity[];
        posts: import("../post/entities/post.entity").PostEntity[];
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
