import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePostInput, GetPostsWhere } from "./posts.input";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";
import { PostsList, PostsObject } from "./posts.object";
import { PostsEntity } from "./posts.entity";

@Resolver()
export class PostsResolver {
    constructor(
        private postsRepository: PostsRepository,
        private postsService: PostsService
    ) {}

    @Query(() => PostsList)
    getPosts(
        @Args("where") where: GetPostsWhere,
    ): Promise<{ list: PostsEntity[] }> {
        return this.postsService.getPosts(where);
    }

    @Mutation(() => PostsObject)
    createPost(
        @Args("createPostInput") createPostInput: CreatePostInput,
    ): Promise<PostsEntity> {
        return this.postsService.createPost(createPostInput);
    }
}
