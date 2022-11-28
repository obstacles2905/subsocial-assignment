import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsRepository } from "../posts/posts.repository";
import { PostsProcessedRepository } from "../posts/postsProcessed.repository";
import { SubsocialService } from "./subsocial.service";
import { PostsService } from "../posts/posts.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        PostsRepository,
        PostsProcessedRepository
    ])],
    providers: [PostsService, SubsocialService],
    exports: [SubsocialService],
})
export class SubsocialModule {}
