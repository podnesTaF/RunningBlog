import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConversationController} from "./conversation.controller";
import {ConversationEntity} from "./entities/conversation.entity";
import {ConversationService} from "./conversation.service";
import {MessageEntity} from "../messages/entities/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ConversationEntity, MessageEntity])],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationModule {}