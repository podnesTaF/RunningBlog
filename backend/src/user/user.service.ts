import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/searchg-user.dto';
import { CommentEntity } from '../comment/entities/comment.entity';
import {FollowsEntity} from "../follows/entities/follows.entity";
import {LikeEntity} from "../like/entities/like.entity";
import {PostEntity} from "../post/entities/post.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save({...dto, follows: [], followers: []});
  }

  async findAll() {
    const qb = await this.repository.createQueryBuilder('u')

    await qb.leftJoinAndMapMany('u.followers', FollowsEntity, 'following', 'following.followingId = u.id').loadRelationCountAndMap('u.followingsCount', 'u.followings', 'followings').getMany()

    await qb.leftJoinAndMapMany('u.likes', LikeEntity, 'like', 'like.userId = u.id').loadRelationCountAndMap('u.likesCount', 'u.likes', 'likes').getMany()

    await qb.leftJoinAndMapMany('u.posts', PostEntity, 'posts', 'posts.userId = u.id').loadRelationCountAndMap('u.postsCount', 'u.posts', 'posts').getMany()

    await qb.leftJoinAndMapMany(
        'u.comments',
        CommentEntity,
        'comment',
        'comment.userId = u.id',
    )
        .loadRelationCountAndMap('u.commentsCount', 'u.comments', 'comments')
        .getMany();

    const users = await qb.leftJoinAndMapMany('u.followings', FollowsEntity, 'follower', 'follower.followerId = u.id').loadRelationCountAndMap('u.followerCount', 'u.followers', 'followers')
        .getMany()

    return users.map((obj) => {
      delete obj.posts
      delete obj.likes
      delete obj.comments
      return obj
    });
  }

  async findById(id: number) {
    const qb = this.repository.createQueryBuilder('u')
    const user = await qb.leftJoinAndMapMany('u.likes', LikeEntity, 'like', 'like.userId = u.id').where({id}).getOne()
    return user
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne({ where: { ...cond } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.repository.findOne({where: { id } });

    if (toUpdate.password !== dto.oldPassword) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'the old password is incorrect',
      }, HttpStatus.FORBIDDEN);
    }

    delete toUpdate.fullName;
    delete toUpdate.password;
    let updated = Object.assign(toUpdate, dto);


    return await this.repository.save(updated);
  }

  async search(dto: SearchUserDto) {
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

}
