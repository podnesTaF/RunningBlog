"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const post_module_1 = require("./post/post.module");
const post_entity_1 = require("./post/entities/post.entity");
const comment_entity_1 = require("./comment/entities/comment.entity");
const auth_module_1 = require("./auth/auth.module");
const file_module_1 = require("./file/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const comment_module_1 = require("./comment/comment.module");
const follows_entity_1 = require("./follows/entities/follows.entity");
const follows_module_1 = require("./follows/follows.module");
const like_module_1 = require("./like/like.module");
const like_entity_1 = require("./like/entities/like.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'podnes1972',
                database: 'postgres',
                entities: [user_entity_1.UserEntity, post_entity_1.PostEntity, comment_entity_1.CommentEntity, follows_entity_1.FollowsEntity, like_entity_1.LikeEntity],
                synchronize: true,
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.resolve)(__dirname, 'static'),
            }),
            comment_module_1.CommentModule,
            follows_module_1.FollowsModule,
            auth_module_1.AuthModule,
            file_module_1.FileModule,
            like_module_1.LikeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map