import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Start the NestJS application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('server running at http://localhost:3000');
}
bootstrap();
