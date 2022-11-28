import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class GetPostsWhere {
    @Field(() => Number, { nullable: true })
    id?: number;
}

@InputType()
export class ContentInput {
    @IsNotEmpty()
    @Field(() => String)
    body: string;

    @Field(() => [String])
    tags: string[];

    @Field(() => String)
    image: string;

    @Field(() => String)
    title: string;
}

@InputType()
export class CreatePostInput {
    @IsNotEmpty()
    @Field(() => String)
    spaceId: string;

    @IsNotEmpty()
    @Field(() => String)
    ownerId: string;

    @IsNotEmpty()
    @Field(() => ContentInput)
    content: ContentInput;
}