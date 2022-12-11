import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FollowsController} from "./follows.controller";
import {FollowsService} from "./follows.service";
import {FollowsEntity} from "./entities/follows.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FollowsEntity])],
    controllers: [FollowsController],
    providers: [FollowsService]
})

export class FollowsModule {}
