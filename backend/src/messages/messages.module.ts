import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MessageController} from "./messages.controller";
import {MessageService} from "./messages.service";
import {MessageEntity} from "./entities/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}