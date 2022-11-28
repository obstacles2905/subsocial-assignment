import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

@ObjectType()
export class PostsObject {
    @Field()
    id: number;

    @Field()
    ownerId: string;

    @Field()
    spaceId: string;

    @Field({ nullable: true })
    body: string;

    @Field(() => [String!], { nullable: true })
    tags: string[];

    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    syncedBlock: string;

    @Field({ nullable: true })
    syncedContentId: string;

    @Field()
    createdAtTime: number;
}

@ObjectType()
export class PostsList {
    @IsNotEmpty()
    @Field(() => [PostsObject])
    list: PostsObject[];
}