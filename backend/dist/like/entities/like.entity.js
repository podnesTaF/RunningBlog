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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const post_entity_1 = require("../../post/entities/post.entity");
let LikeEntity = class LikeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LikeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.likes),
    __metadata("design:type", user_entity_1.UserEntity)
], LikeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.PostEntity, post => post.likes),
    __metadata("design:type", post_entity_1.PostEntity)
], LikeEntity.prototype, "post", void 0);
LikeEntity = __decorate([
    (0, typeorm_1.Entity)('likes')
], LikeEntity);
exports.LikeEntity = LikeEntity;
//# sourceMappingURL=like.entity.js.map