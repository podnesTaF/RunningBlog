import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ConversationEntity} from "./entities/conversation.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(ConversationEntity)
        private repository: Repository<ConversationEntity>) {}

    create({senderId, receiverId}: { senderId: number, receiverId: number }) {
        return this.repository.save({
            sender: {id: senderId},
            receiver: {id: receiverId}
        });
    }

    getConversation(userId: number) {
        return this.repository.findOne({
            where: [
                {sender: {id: userId}},
                {receiver: {id: userId}}
            ],
            relations: ['sender', 'receiver']
        })
    }
}