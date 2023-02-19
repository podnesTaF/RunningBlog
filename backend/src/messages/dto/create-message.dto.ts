import {IsNumber, IsString} from "class-validator";

export class CreateMessageDto {

    @IsNumber()
    conversationId: number;

    @IsString()
    text: string;
}