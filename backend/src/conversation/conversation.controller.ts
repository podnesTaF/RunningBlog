import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly ConversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto) {
    return this.ConversationService.create(createConversationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getConversations(@User() userId: number) {
    return this.ConversationService.getConversations(userId);
  }
}
