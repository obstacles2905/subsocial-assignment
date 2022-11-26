import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PostsModule } from "./posts/posts.module";
import { dbConfig } from "./db.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            ...dbConfig
        }),
        PostsModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
                autoSchemaFile: "schema.graphql",
                debug: true,
                playground: true,
                stopOnTerminationSignals: true,
                subscriptions: {
                    'subscriptions-transport-ws': {
                        onConnect: (connectionParams, context, connect) => {
                        return {
                            req: { headers: {
                              ...connectionParams,
                              'authorization': connectionParams.Authorization,
                            }, ...connect}
                        }
                      }
                    },
                  },
         }),
    ],
    providers: [],
})
export class AppModule {}
