import {IsNumber} from "class-validator";

export class CreateConversationDto {

    @IsNumber()
    senderId: number;

    @IsNumber()
    receiverId: number;
}