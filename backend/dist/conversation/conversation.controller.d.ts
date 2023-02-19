import { ConversationService } from "./conversation.service";
export declare class ConversationController {
    private readonly ConversationService;
    constructor(ConversationService: ConversationService);
    create(createConversationDto: any): Promise<{
        sender: {
            id: number;
        };
        receiver: {
            id: number;
        };
    } & import("./entities/conversation.entity").ConversationEntity>;
    getConversation(userId: number): Promise<import("./entities/conversation.entity").ConversationEntity>;
}
