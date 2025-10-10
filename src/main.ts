import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // esto es para las validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo permite lo definido en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos de más
      transform: true, // convierte tipos automáticamente
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
