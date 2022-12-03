import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    register(dto: CreateUserDto): Promise<{
        token: string;
        fullName: string;
        email: string;
        id: number;
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
