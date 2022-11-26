import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsResolver } from "./posts.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsEntity } from "./posts.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PostsEntity])],
    providers: [PostsResolver, PostsService],
    exports: [PostsService],
})
export class PostsModule {}
