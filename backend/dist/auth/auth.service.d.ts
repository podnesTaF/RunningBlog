import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FileService } from "../file/file.service";
export declare class AuthService {
    private userService;
    private jwtService;
    private fileService;
    constructor(userService: UserService, jwtService: JwtService, fileService: FileService);
    validateUser(email: string, password: string): Promise<any>;
    generateJwtToken(data: {
        id: number;
        email: string;
    }): string;
    login(user: UserEntity): Promise<{
        token: string;
        id: number;
        fullName: string;
        email: string;
        image: string;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followers: import("../follows/entities/follows.entity").FollowsEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        likes: import("../like/entities/like.entity").LikeEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    register(image: any, dto: CreateUserDto): Promise<{
        token: string;
        follows: any[];
        followers: any[] & import("../follows/entities/follows.entity").FollowsEntity[];
        fullName: string;
        email: string;
        image: string;
        id: number;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        followings: import("../follows/entities/follows.entity").FollowsEntity[];
        likes: import("../like/entities/like.entity").LikeEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
