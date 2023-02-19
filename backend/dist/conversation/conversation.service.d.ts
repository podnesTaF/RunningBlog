import { Repository } from "typeorm";
import { ConversationEntity } from "./entities/conversation.entity";
export declare class ConversationService {
    private repository;
    constructor(repository: Repository<ConversationEntity>);
    create({ senderId, receiverId }: {
        senderId: number;
        receiverId: number;
    }): Promise<{
        sender: {
            id: number;
        };
        receiver: {
            id: number;
        };
    } & ConversationEntity>;
    getConversation(userId: number): Promise<ConversationEntity>;
}
