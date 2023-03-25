"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
let MessageService = class MessageService {
    constructor(repository) {
        this.repository = repository;
    }
    create(userId, text, conversationId) {
        return this.repository.save({
            conversation: { id: conversationId },
            text,
            sender: { id: userId },
        });
    }
    async getChatMessages(conversationId) {
        const messages = await this.repository.find({
            where: { conversation: { id: conversationId } },
            relations: ['conversation', 'sender'],
        });
        const reversedMessages = [];
        for (let i = messages.length - 1; i > 0; i--) {
            reversedMessages.push(messages[i]);
        }
        return reversedMessages;
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=messages.service.js.map