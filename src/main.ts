import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ErrorInterceptor } from "./error.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ErrorInterceptor());
    await app.listen(process.env.APPLICATION_PORT);
}

bootstrap();
