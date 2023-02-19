import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {MessageService} from "./messages.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {User} from "../decorators/user.decorator";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@User() userId: number, @Body() createMessageDto: CreateMessageDto) {
        return this.messageService.create(userId, createMessageDto.text, createMessageDto.conversationId)
    }

    @Get(':conversationId')
    getChatMessages(@Param('conversationId') conversationId: string) {
        console.log(conversationId)
        return this.messageService.getChatMessages(+conversationId)
    }
}