import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());





// Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Job Board API')
    .setDescription('API documentation for the Job Board backend')
    .setVersion('1.0')
    .addBearerAuth() // JWT support in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: /api


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
