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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../comment/entities/comment.entity");
const follows_entity_1 = require("../follows/entities/follows.entity");
const like_entity_1 = require("../like/entities/like.entity");
const post_entity_1 = require("../post/entities/post.entity");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    create(dto) {
        return this.repository.save(Object.assign(Object.assign({}, dto), { follows: [], followers: [] }));
    }
    async findAll() {
        const qb = await this.repository.createQueryBuilder('u');
        await qb.leftJoinAndMapMany('u.followers', follows_entity_1.FollowsEntity, 'following', 'following.followingId = u.id').loadRelationCountAndMap('u.followingsCount', 'u.followings', 'followings').getMany();
        await qb.leftJoinAndMapMany('u.likes', like_entity_1.LikeEntity, 'like', 'like.userId = u.id').loadRelationCountAndMap('u.likesCount', 'u.likes', 'likes').getMany();
        await qb.leftJoinAndMapMany('u.posts', post_entity_1.PostEntity, 'posts', 'posts.userId = u.id').loadRelationCountAndMap('u.postsCount', 'u.posts', 'posts').getMany();
        await qb.leftJoinAndMapMany('u.comments', comment_entity_1.CommentEntity, 'comment', 'comment.userId = u.id')
            .loadRelationCountAndMap('u.commentsCount', 'u.comments', 'comments')
            .getMany();
        const users = await qb.leftJoinAndMapMany('u.followings', follows_entity_1.FollowsEntity, 'follower', 'follower.followerId = u.id').loadRelationCountAndMap('u.followerCount', 'u.followers', 'followers')
            .getMany();
        return users.map((obj) => {
            delete obj.posts;
            delete obj.likes;
            delete obj.comments;
            return obj;
        });
    }
    async findById(id) {
        const qb = this.repository.createQueryBuilder('u');
        const user = await qb.leftJoinAndMapMany('u.likes', like_entity_1.LikeEntity, 'like', 'like.userId = u.id').where({ id }).getOne();
        return user;
    }
    findByCond(cond) {
        return this.repository.findOne({ where: Object.assign({}, cond) });
    }
    async update(id, dto) {
        let toUpdate = await this.repository.findOne({ where: { id } });
        if (toUpdate.password !== dto.oldPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'the old password is incorrect',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        delete toUpdate.fullName;
        delete toUpdate.password;
        let updated = Object.assign(toUpdate, dto);
        return await this.repository.save(updated);
    }
    async search(dto) {
        const qb = this.repository.createQueryBuilder('u');
        qb.limit(dto.limit || 0);
        qb.take(dto.take || 10);
        if (dto.fullName) {
            qb.andWhere(`u.fullName ILIKE :fullName`);
        }
        if (dto.email) {
            qb.andWhere(`u.email ILIKE :email`);
        }
        qb.setParameters({
            email: `%${dto.email}%`,
            fullName: `%${dto.fullName}%`,
        });
        const [items, total] = await qb.getManyAndCount();
        return { items, total };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map