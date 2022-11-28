import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const dbConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: +process.env.TYPEORM_PORT,
    autoLoadEntities: true,
    entities: [join(__dirname, "**", "*.entity.{ts,js}")],
    extra: {
        charset: "utf8mb4_unicode_ci",
    },
    synchronize: true
};
