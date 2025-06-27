import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RAGService } from './rag/rag.service';
import { GenService } from './model/gen.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RAGService, GenService],
})
export class AppModule {}