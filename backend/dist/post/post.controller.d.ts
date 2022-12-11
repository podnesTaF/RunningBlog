import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/searchg-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(files: any, userId: number, createPostDto: CreatePostDto): Promise<{
        title: string;
        text: string;
        image: any;
        tags: string;
        user: {
            id: number;
        };
        description: string;
    } & import("./entities/post.entity").PostEntity>;
    update(files: any, userId: number, id: string, updatePostDto: UpdatePostDto): Promise<import("typeorm").UpdateResult>;
    remove(userId: number, id: string): Promise<import("typeorm").DeleteResult>;
    findAll(): Promise<import("./entities/post.entity").PostEntity[]>;
    getPopularPosts(): Promise<{
        items: import("./entities/post.entity").PostEntity[];
        total: number;
    }>;
    searchPosts(dto: SearchPostDto): Promise<{
        items: import("./entities/post.entity").PostEntity[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").PostEntity>;
}
