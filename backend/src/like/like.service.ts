import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LikeEntity} from "./entities/like.entity";

@Injectable()
export class LikeService {
    constructor(@InjectRepository(LikeEntity)
                private repository: Repository<LikeEntity>) {}


    addLike(userId: number, postId: number) {
        return this.repository.save({user: {id: userId}, post: {id: postId}})
    }

    async removeLike(userId: number, postId: number) {
        const like = await this.repository.findOne({
            relations: ['user'],
            where: [
                {post: {id: postId}},
                {user: {id: userId}}
            ]
        })

        return this.repository.delete(like.id)
    }

    getPostLikes(postId: number) {
        const likes = this.repository.find({
            relations: ['user'],
            where: {post: {id: postId}}
        })

        return likes
    }
}