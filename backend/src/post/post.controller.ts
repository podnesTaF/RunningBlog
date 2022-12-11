import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards, UseInterceptors, UploadedFiles
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {SearchPostDto} from './dto/searchg-post.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {User} from '../decorators/user.decorator';
import {FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @User() userId: number, @Body() createPostDto: CreatePostDto) {
        const {image} = files
        if(image) {
            return this.postService.create(image[0], createPostDto, userId);
        } else {
            return this.postService.create(null, createPostDto, userId);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
    ]))
    update(
        @UploadedFiles() files,
        @User() userId: number,
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        const{image} = files
        return this.postService.update(image[0], +id, updatePostDto, userId);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@User() userId: number, @Param('id') id: string) {
        return this.postService.remove(+id, userId);
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //   console.log(file);
    //   return of({imagePath: file.path})
    // }

    @Get()
    findAll(@Query('query') query: string) {
        if (query) {
            const strings = query.split(',');
            const ids = strings.map(id => +id)
            return this.postService.findAll(ids);
        } else {
            return this.postService.findAll();
        }
    }

    @Get('/popular')
    getPopularPosts() {
        return this.postService.popular();
    }

    @Get('/search')
    searchPosts(@Query() dto: SearchPostDto) {
        return this.postService.search(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id)
    }
}
