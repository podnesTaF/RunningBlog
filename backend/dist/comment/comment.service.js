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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(dto, userId) {
        const comment = await this.repository.save({
            text: dto.text,
            post: { id: dto.postId },
            user: { id: userId },
        });
        return this.repository.findOne({
            relations: ['user'], where: { id: comment.id }
        });
    }
    async findAll(postId, userId) {
        const qb = this.repository.createQueryBuilder('c');
        if (postId) {
            qb.where('c.postId = :postId', { postId });
        }
        if (userId) {
            qb.where('c.userId = :userId', { userId });
        }
        const arr = await qb
            .leftJoinAndSelect('c.post', 'post')
            .leftJoinAndSelect('c.user', 'user')
            .getMany();
        return arr.map((obj) => {
            return Object.assign(Object.assign({}, obj), { post: { id: obj.post.id, title: obj.post.title } });
        });
    }
    findOne(id) {
        return this.repository.findOne({ where: { id } });
    }
    update(id, dto) {
        return this.repository.update(id, dto);
    }
    remove(id) {
        return this.repository.delete(id);
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map