import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class PaginationObject {
    @IsNotEmpty()
    @Field(() => Number)
    page: number;

    @IsNotEmpty()
    @Field(() => Number)
    perPage: number;

    @IsNotEmpty()
    @Field(() => Number)
    total: number;
}
