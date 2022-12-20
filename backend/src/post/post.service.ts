import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/searchg-post.dto';
import {FileService, FileType} from "../file/file.service";
import {LikeEntity} from "../like/entities/like.entity";
import {UserEntity} from "../user/entities/user.entity";
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
    private fileService: FileService,
  ) {}

  async findAll(ids?: number[]) {
    const qb = await this.repository.createQueryBuilder('posts')
    const posts = await qb.leftJoinAndMapMany('posts.likes', LikeEntity, 'like', 'like.postId = posts.id').loadRelationCountAndMap('posts.likesCount','posts.likes', 'likes').orderBy("posts.createdAt", 'DESC').leftJoinAndMapOne('posts.user', UserEntity, 'user', 'user.id = posts.userId').getMany()

    if (!ids) {
      return posts
    }
    return posts.filter(post => ids.includes(post.userId))
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

  async search(dto: SearchPostDto) {
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

  async findOne(id: number) {
    const qb = this.repository.createQueryBuilder('posts')
    await qb
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    const post = await qb.leftJoinAndMapMany('posts.likes', LikeEntity, 'like', 'like.postId = posts.id').loadRelationCountAndMap('posts.likesCount','posts.likes', 'likes').where({id: id}).getOne()

    return post
  }

  create(image, dto: CreatePostDto, userId: number) {
    let imagePath
    if(image) {
      imagePath = this.fileService.createFile(FileType.IMAGE, image)
    } else {
      imagePath = null
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

  async update(image: null | File, id: number, dto: UpdatePostDto, userId: number) {
    const find = await this.repository.findOne({ where: { id: +id } });

    const imagePath = image && this.fileService.createFile(FileType.IMAGE, image)

    if (!find) {
      throw new NotFoundException('Article not found');
    }

    const firstParagraph = dto.text?.slice(0, 20);
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

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({ where: { id: +id } });

    if(find.image) {
      const filePath = path.resolve(__dirname, '..', 'static', find.image)
      fs.unlinkSync(filePath)
    }


    if (!find) {
      throw new NotFoundException('Article not found');
    }

    if (find.user.id !== userId) {
      throw new ForbiddenException('No admission for this article');
    }

    return this.repository.delete(id)
  }
}
