import {
    Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from "../../user/entities/user.entity";
import {MessageEntity} from "../../messages/entities/message.entity";

@Entity('conversation')
export class ConversationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.conversationsAsSender)
    sender: UserEntity;

    @ManyToOne(() => UserEntity, user => user.conversationsAsReceiver)
    receiver: UserEntity;

    @OneToMany(() => MessageEntity, message => message.conversation)
    messages: MessageEntity[];
}