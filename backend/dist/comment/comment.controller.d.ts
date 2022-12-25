import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, userId: number): Promise<import("./entities/comment.entity").CommentEntity>;
    findAll(query: {
        postId?: string;
        userId?: string;
    }): Promise<{
        post: {
            id: number;
            title: string;
        };
        id: number;
        text: string;
        user: import("../user/entities/user.entity").UserEntity;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<import("./entities/comment.entity").CommentEntity>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
