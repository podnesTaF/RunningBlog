import { UserEntity } from "../../user/entities/user.entity";
import { MessageEntity } from "../../messages/entities/message.entity";
export declare class ConversationEntity {
    id: number;
    sender: UserEntity;
    receiver: UserEntity;
    messages: MessageEntity[];
}
