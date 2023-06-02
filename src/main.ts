import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rawBodyMiddleware from './utils/middleware/rawBody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(rawBodyMiddleware());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Invoice service swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('openapi', app, document);

  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
