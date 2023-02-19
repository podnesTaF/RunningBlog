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
import * as process from "process";
import {MessageModule} from "./messages/messages.module";
import {ConversationModule} from "./conversation/conversation.module";
import {ConversationEntity} from "./conversation/entities/conversation.entity";
import {MessageEntity} from "./messages/entities/message.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: 'postgres',
            password: "podnes1972",
            database: 'postgres',
            entities: [UserEntity, PostEntity, CommentEntity, FollowsEntity, LikeEntity, ConversationEntity, MessageEntity],
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
        MessageModule,
        ConversationModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
