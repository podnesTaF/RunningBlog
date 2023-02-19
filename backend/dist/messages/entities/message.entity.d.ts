import { ConversationEntity } from "../../conversation/entities/conversation.entity";
import { UserEntity } from "../../user/entities/user.entity";
export declare class MessageEntity {
    id: number;
    conversation: ConversationEntity;
    sender: UserEntity;
    text: string;
}
