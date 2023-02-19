import { MessageService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(userId: number, createMessageDto: CreateMessageDto): Promise<{
        conversation: {
            id: number;
        };
        text: string;
        sender: {
            id: number;
        };
    } & import("./entities/message.entity").MessageEntity>;
    getChatMessages(conversationId: string): Promise<import("./entities/message.entity").MessageEntity[]>;
}
