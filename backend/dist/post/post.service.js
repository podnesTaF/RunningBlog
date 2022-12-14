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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const file_service_1 = require("../file/file.service");
const like_entity_1 = require("../like/entities/like.entity");
const user_entity_1 = require("../user/entities/user.entity");
const path = require("path");
const fs = require("fs");
let PostService = class PostService {
    constructor(repository, fileService) {
        this.repository = repository;
        this.fileService = fileService;
    }
    async findAll(ids) {
        const qb = await this.repository.createQueryBuilder('posts');
        const posts = await qb.leftJoinAndMapMany('posts.likes', like_entity_1.LikeEntity, 'like', 'like.postId = posts.id').loadRelationCountAndMap('posts.likesCount', 'posts.likes', 'likes').orderBy("posts.createdAt", 'DESC').leftJoinAndMapOne('posts.user', user_entity_1.UserEntity, 'user', 'user.id = posts.userId').getMany();
        if (!ids) {
            return posts;
        }
        return posts.filter(post => ids.includes(post.userId));
    }
    async popular() {
        const qb = this.repository.createQueryBuilder();
        qb.orderBy('views', 'DESC');
        qb.limit(10);
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            total,
        };
    }
    async search(dto) {
        const qb = this.repository.createQueryBuilder('p');
        qb.leftJoinAndSelect('p.user', 'user');
        qb.limit(dto.limit || 0);
        qb.take(dto.take || 10);
        if (dto.views) {
            qb.orderBy('views', dto.views);
        }
        if (dto.text) {
            qb.andWhere(`p.text ILIKE :text`);
        }
        if (dto.title) {
            qb.andWhere(`p.title ILIKE :title`);
        }
        if (dto.tag) {
            qb.andWhere(`p.tags ILIKE :tag`);
        }
        qb.setParameters({
            title: `%${dto.title}%`,
            text: `%${dto.text}%`,
            tag: `%${dto.tag}%`,
            views: dto.views || '',
        });
        const [items, total] = await qb.getManyAndCount();
        return { items, total };
    }
    async findOne(id) {
        const qb = this.repository.createQueryBuilder('posts');
        await qb
            .whereInIds(id)
            .update()
            .set({
            views: () => 'views + 1',
        })
            .execute();
        const post = await qb.leftJoinAndMapMany('posts.likes', like_entity_1.LikeEntity, 'like', 'like.postId = posts.id').loadRelationCountAndMap('posts.likesCount', 'posts.likes', 'likes').where({ id: id }).getOne();
        return post;
    }
    create(image, dto, userId) {
        let imagePath;
        if (image) {
            imagePath = this.fileService.createFile(file_service_1.FileType.IMAGE, image);
        }
        else {
            imagePath = null;
        }
        const firstParagraph = dto.text.slice(0, 20);
        return this.repository.save({
            type: dto.type,
            distance: +dto.distance,
            duration: +dto.duration,
            title: dto.title,
            text: dto.text,
            image: imagePath,
            tags: dto.tags,
            userId: userId,
            user: { id: userId },
            description: firstParagraph || '',
        });
    }
    async update(image, id, dto, userId) {
        var _a;
        const find = await this.repository.findOne({ where: { id: +id } });
        const imagePath = image && this.fileService.createFile(file_service_1.FileType.IMAGE, image);
        if (!find) {
            throw new common_1.NotFoundException('Article not found');
        }
        const firstParagraph = (_a = dto.text) === null || _a === void 0 ? void 0 : _a.slice(0, 20);
        return this.repository.update(id, {
            type: dto.type,
            distance: +dto.distance,
            duration: +dto.duration,
            title: dto.title,
            text: dto.text,
            image: imagePath || find.image,
            tags: dto.tags,
            userId: userId,
            user: { id: userId },
            description: firstParagraph || '',
        });
    }
    async remove(id, userId) {
        const find = await this.repository.findOne({ where: { id: +id } });
        if (find.image) {
            const filePath = path.resolve(__dirname, '..', 'static', find.image);
            fs.unlinkSync(filePath);
        }
        if (!find) {
            throw new common_1.NotFoundException('Article not found');
        }
        if (find.user.id !== userId) {
            throw new common_1.ForbiddenException('No admission for this article');
        }
        return this.repository.delete(id);
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map