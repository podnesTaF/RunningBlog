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

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
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
    await this.repository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    return this.repository.findOne({ where: { id } });
  }

  create(dto: CreatePostDto, userId: number) {
    const firstParagraph = dto.text.slice(0, 20);
    return this.repository.save({
      title: dto.title,
      text: dto.text,
      image: dto.image,
      tags: dto.tags,
      user: { id: userId },
      description: firstParagraph || '',
    });
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const find = await this.repository.findOne({ where: { id: +id } });

    if (!find) {
      throw new NotFoundException('Article not found');
    }

    const firstParagraph = dto.text.slice(0, 20);
    return this.repository.update(id, {
      title: dto.title,
      text: dto.text,
      image: dto.image,
      tags: dto.tags,
      user: { id: userId },
      description: firstParagraph || '',
    });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({ where: { id: +id } });

    if (!find) {
      throw new NotFoundException('Article not found');
    }

    if (find.user.id !== userId) {
      throw new ForbiddenException('No admission for this article');
    }

    return this.repository.delete(id);
  }
}
