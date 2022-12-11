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
exports.FollowsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const follows_entity_1 = require("./entities/follows.entity");
let FollowsService = class FollowsService {
    constructor(repository) {
        this.repository = repository;
    }
    async getFollows() {
        const qb = await this.repository.createQueryBuilder('follows');
        const follows = await qb.leftJoinAndSelect('follows.following', 'following').leftJoinAndSelect('follows.follower', 'follower').getMany();
        return follows.map(obj => {
            return {
                id: obj.id,
                followingId: obj.following,
                followerId: obj.follower
            };
        });
    }
    async getFollow(id) {
        const qb = await this.repository.createQueryBuilder('follows');
        const follows = await qb.whereInIds(id).leftJoinAndSelect('follows.following', 'following').leftJoinAndSelect('follows.follower', 'follower').getOne();
        return Object.assign(Object.assign({}, follows), { following: follows.following, follower: follows.follower });
    }
    async addFollows(dto) {
        const follows = await this.repository.save({
            following: { id: dto.followingId },
            follower: { id: dto.followerId },
        });
        const follower = await this.repository.findOne({ relations: ['following'], where: { following: follows.following } });
        const following = await this.repository.findOne({ relations: ['follower'], where: { follower: follows.following } });
        return { follower, following };
    }
};
FollowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follows_entity_1.FollowsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FollowsService);
exports.FollowsService = FollowsService;
//# sourceMappingURL=follows.service.js.map