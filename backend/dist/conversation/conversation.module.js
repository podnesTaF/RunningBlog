"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_controller_1 = require("./conversation.controller");
const conversation_entity_1 = require("./entities/conversation.entity");
const conversation_service_1 = require("./conversation.service");
const message_entity_1 = require("../messages/entities/message.entity");
let ConversationModule = class ConversationModule {
};
ConversationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([conversation_entity_1.ConversationEntity, message_entity_1.MessageEntity])],
        controllers: [conversation_controller_1.ConversationController],
        providers: [conversation_service_1.ConversationService],
        exports: [conversation_service_1.ConversationService],
    })
], ConversationModule);
exports.ConversationModule = ConversationModule;
//# sourceMappingURL=conversation.module.js.map