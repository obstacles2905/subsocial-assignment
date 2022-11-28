import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ErrorInterceptor } from "./error.interceptor";

const logger = new Logger('NestApplication');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ErrorInterceptor());
    app.enableCors();
    
    const port = process.env.APPLICATION_PORT;
    await app.listen(port, () => logger.log(`Application started on port ${port}`));
}

bootstrap();
