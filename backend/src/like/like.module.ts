import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LikeController} from "./like.controller";
import {LikeEntity} from "./entities/like.entity";
import {LikeService} from "./like.service";

@Module({
    imports: [TypeOrmModule.forFeature([LikeEntity])],
    controllers: [LikeController],
    providers: [LikeService]
})

export class LikeModule {}