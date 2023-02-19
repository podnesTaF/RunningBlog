import {
    Column,
    Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import {ConversationEntity} from "../../conversation/entities/conversation.entity";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ConversationEntity, conversation => conversation.messages)
    conversation: ConversationEntity;

    @ManyToOne(() => UserEntity, user => user.messages)
    sender: UserEntity;

    @Column()
    text: string;

}