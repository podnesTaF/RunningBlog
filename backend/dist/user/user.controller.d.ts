import { UserService } from './user.service';
import { SearchUserDto } from './dto/searchg-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    getProfile(req: any): Promise<import("./entities/user.entity").UserEntity>;
    update(req: any, body: any): Promise<import("./entities/user.entity").UserEntity>;
    search(dto: SearchUserDto): Promise<{
        items: import("./entities/user.entity").UserEntity[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").UserEntity>;
}
