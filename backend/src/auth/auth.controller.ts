import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body, UseInterceptors, UploadedFiles, Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'image', maxCount: 1},
  ]))
  register(@UploadedFiles() files, @Body() dto: CreateUserDto) {
    const {image} = files
    if(image) {
      return this.authService.register(image[0], dto);
    } else {
      return this.authService.register(null, dto);
    }
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // logout(@Res() res: Response, @Body() token: string) {
  //   // res.clearCookie('token')
  //   // res.header('Authorization', '')
  //   return {
  //     message: 'success'
  //   }
  // }
}
