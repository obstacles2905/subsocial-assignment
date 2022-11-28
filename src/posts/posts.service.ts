import { Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";
import { CreatePostInput, GetPostsWhere } from "./posts.input";
import { PostsEntity } from "./posts.entity";

@Injectable()
export class PostsService {
    constructor(
        private postsRepository: PostsRepository,
    ) {}

    async getPosts(where: GetPostsWhere): Promise<{list: PostsEntity[]}> {
        return {
            list: await this.postsRepository.find(where)
        };
    }

    async createPost({
        spaceId,
        ownerId,
        content: {
            body,
            tags,
            image,
            title
        }
    }: CreatePostInput) {
        return this.postsRepository.save({
            spaceId,
            ownerId,
            body,
            tags,
            image,
            title
        });
    }

    async getPostsUnprocessed() {
        return this.postsRepository.find({ syncedBlock: null, syncedContentId: null });
    }
}