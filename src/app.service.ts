import { Injectable } from '@nestjs/common';
import { RAGService } from './rag/rag.service';
import { GenService } from './model/gen.service';

@Injectable()
export class AppService {
  constructor(
    private readonly rag: RAGService,
    private readonly generator: GenService,
  ) {}

  async generate(query: string) {
    const context = this.rag.getRelevantContext(query);
    const response = this.generator.generateText(context, query);
    return { query, context, response };
  }
}