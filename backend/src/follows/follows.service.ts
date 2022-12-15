import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FollowsEntity} from "./entities/follows.entity";
import {CreateFollowsDto} from "./dto/create-follows.dto";

@Injectable()
export class FollowsService {
    constructor(
        @InjectRepository(FollowsEntity)
        private repository: Repository<FollowsEntity>,
    ) {}


    async getFollows() {
        const qb = await this.repository.createQueryBuilder('follows')
        const follows = await qb.leftJoinAndSelect('follows.following', 'following').leftJoinAndSelect('follows.follower', 'follower').getMany()
        return follows.map(obj => {
            return {
                id: obj.id,
                followingId: obj.following,
                followerId: obj.follower
            }
        })
    }

    async getFollow(id: number) {
        const qb = await this.repository.createQueryBuilder('follows')
        const follows = await qb.whereInIds(id).leftJoinAndSelect('follows.following', 'following').leftJoinAndSelect('follows.follower', 'follower').getOne()

            return {
                ...follows,
                following: follows.following,
                follower: follows.follower
            }

    }

    async addFollows(dto: CreateFollowsDto) {
        const follows = await this.repository.save({
            following: {id: dto.followingId},
            follower: {id: dto.followerId},
        })
        const follower = await this.repository.findOne({relations: ['following'], where: {following: follows.following}})
        const following = await this.repository.findOne({relations: ['follower'], where: {follower: follows.follower}})

        return following.follower
    }

    async unfollow(userId: number, unfollowId: number) {
        const qb = await this.repository.createQueryBuilder('follow')
        const follow = await qb.where('follow.follower.id = :userId', {userId}).andWhere("follow.following.id = :unfollowId", {unfollowId}).getOne()

        return this.repository.delete(follow.id)
    }
}