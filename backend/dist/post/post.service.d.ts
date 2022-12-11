import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/searchg-post.dto';
import { FileService } from "../file/file.service";
export declare class PostService {
    private repository;
    private fileService;
    constructor(repository: Repository<PostEntity>, fileService: FileService);
    findAll(ids?: number[]): Promise<PostEntity[]>;
    popular(): Promise<{
        items: PostEntity[];
        total: number;
    }>;
    search(dto: SearchPostDto): Promise<{
        items: PostEntity[];
        total: number;
    }>;
    findOne(id: number): Promise<PostEntity>;
    create(image: any, dto: CreatePostDto, userId: number): Promise<{
        title: string;
        text: string;
        image: any;
        tags: string;
        userId: number;
        user: {
            id: number;
        };
        description: string;
    } & PostEntity>;
    update(image: any, id: number, dto: UpdatePostDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
