import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MessageEntity} from "./entities/message.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private repository: Repository<MessageEntity>,
    ) {}

    create(userId: number, text: string, conversationId: number) {
        return this.repository.save({
            conversation: {id: conversationId},
            text,
            sender: {id: userId}
        })
    }

    getChatMessages(conversationId: number) {
        return this.repository.find({
            where: {conversation: {id: conversationId}},
            relations: ['conversation', 'sender']
        })
    }
}