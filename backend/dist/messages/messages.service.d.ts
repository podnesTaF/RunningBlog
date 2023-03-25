import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
export declare class MessageService {
    private repository;
    constructor(repository: Repository<MessageEntity>);
    create(userId: number, text: string, conversationId: number): Promise<{
        conversation: {
            id: number;
        };
        text: string;
        sender: {
            id: number;
        };
    } & MessageEntity>;
    getChatMessages(conversationId: number): Promise<any[]>;
}
