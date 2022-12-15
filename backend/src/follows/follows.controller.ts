import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from "@nestjs/common";
import {FollowsService} from "./follows.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('follows')
export class FollowsController {
    constructor(private readonly followsService: FollowsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getFollows() {
        return this.followsService.getFollows();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addFollows(@Request() req, @Body() res: {id: number}) {
        const {id} = res
        const dto = {followerId: +req.user.id, followingId: id}
        return this.followsService.addFollows(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getFollow(@Param('id') id: string) {
        return this.followsService.getFollow(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    unfollow(@Request() req, @Param('id') id: string) {
        return this.followsService.unfollow(+req.user.id ,+id);
    }


}
