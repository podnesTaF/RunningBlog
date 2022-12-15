import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from "@nestjs/common";
import {LikeService} from "./like.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('likes')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}


    @Get(':id')
    getPostLikes(@Param('id') id: string){
        return this.likeService.getPostLikes(+id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addLike(@Request() req, @Body() body: {postId: number}) {
        const {postId} = body;
        return this.likeService.addLike(+req.user.id, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    removeLike(@Request() req, @Param('id') id: string) {
        return this.likeService.removeLike(+req.user.id, +id);
    }
}