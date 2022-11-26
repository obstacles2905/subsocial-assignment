import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class PaginationInput {
    @IsNotEmpty()
    @Field(() => Number)
    page: number;

    @IsNotEmpty()
    @Field(() => Number)
    perPage: number;
}
