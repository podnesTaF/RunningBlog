import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {UserEntity} from './user/entities/user.entity';
import {PostModule} from './post/post.module';
import {PostEntity} from './post/entities/post.entity';
import {CommentEntity} from './comment/entities/comment.entity';
import {AuthModule} from './auth/auth.module';
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {resolve} from "path";
import {CommentModule} from "./comment/comment.module";
import {FollowsEntity} from "./follows/entities/follows.entity";
import {FollowsModule} from "./follows/follows.module";
import { LikeModule } from './like/like.module';
import { LikeEntity } from './like/entities/like.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'podnes1972',
            database: 'postgres',
            entities: [UserEntity, PostEntity, CommentEntity, FollowsEntity, LikeEntity],
            synchronize: true,
        }),
        UserModule,
        PostModule,
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
        CommentModule,
        FollowsModule,
        AuthModule,
        FileModule,
        LikeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
