import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
  });

  // Middleware personnalisé pour les fichiers statiques
  app.use(
    '/uploads/profiles',
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Cross-Origin-Resource-Policy', 'cross-origin');
      next();
    },
    express.static(join(__dirname, '..', 'uploads', 'profiles')),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads', 'profiles'), {
    prefix: '/uploads/profiles',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
