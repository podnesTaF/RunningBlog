import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/searchg-user.dto';
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
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    findByCond(cond: LoginUserDto): Promise<UserEntity>;
    update(id: number, dto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    search(dto: SearchUserDto): Promise<{
        items: UserEntity[];
        total: number;
    }>;
    addToFollows(followerId: number, followingId: number): Promise<void>;
}
