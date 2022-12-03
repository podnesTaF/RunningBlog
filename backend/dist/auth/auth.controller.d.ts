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
