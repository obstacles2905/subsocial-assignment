import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PostsModule } from "./posts/posts.module";
import { dbConfig } from "./db.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubsocialModule } from "./integration/subsocial.module";
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            ...dbConfig
        }),
        ScheduleModule.forRoot(),
        PostsModule,
        SubsocialModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
                autoSchemaFile: "schema.graphql",
                debug: true,
                playground: true,
                stopOnTerminationSignals: true
         }),
    ],
    providers: [],
})
export class AppModule {}
