import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  // Add ValidationPipe with comprehensive transformation settings
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
      },
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
      validateCustomDecorators: true, // Enable validation for custom decorators
      enableDebugMessages: process.env.NODE_ENV !== 'production', // Enable detailed error messages in development
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Landing Page Admin API')
    .setDescription('API for managing landing page banners and subtitles')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();