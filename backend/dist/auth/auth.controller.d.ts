import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followers: import("../follows/entities/follows.entity").FollowsEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    register(files: any, dto: CreateUserDto): Promise<{
        token: string;
        follows: any[];
        followers: any[] & import("../follows/entities/follows.entity").FollowsEntity[];
        fullName: string;
        email: string;
        image: string;
        id: number;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
