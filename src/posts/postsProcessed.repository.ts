import { EntityRepository, Repository } from "typeorm";
import { PostsEntity } from "./posts.entity";
import { PostsProcessedEntity } from "./postsProcessed.entity";

@EntityRepository(PostsProcessedEntity)
export class PostsProcessedRepository extends Repository<PostsProcessedEntity> {}