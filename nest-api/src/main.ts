import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
  });

  const redisClient = redis.createClient(
    parseInt(process.env.REDIS_PORT),
    'redis',
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      store: new RedisStore({
        client: redisClient,
      }),
    }),
  );

  await app.listen(process.env.API_PORT);
}

bootstrap();
