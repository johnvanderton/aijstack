import { Injectable } from '@nestjs/common';
import { RAGService } from './rag/rag.service';
import { GenService } from './model/gen.service';

/**
 * `AppService` Class Definition
 *
 * Service for handling application-level operations
 */
@Injectable()
export class AppService {
  constructor(
    private readonly ragService: RAGService,
    private readonly genService: GenService,
  ) {}

  /**
   * `generate()` Method Definition
   * 
   * Generates an answer based on the provided query
   * 
   * @param query 
   * @returns 
   */
  async generate(query: string) {
    const context = await this.ragService.getContext(query);
    const answer = await this.genService.callLocalModel(context, query);
    return { query, context, answer };
  }

}