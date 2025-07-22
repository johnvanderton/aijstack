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
   * This method retrieves context from the RAG service and then uses the Gen service (LLM) to generate an answer
   * 
   * @param query input value which is the user's question or request
   * @returns an object containing the query, context, and generated answer
   */
  async generate(query: string) {
    //producing the context based on the query (ok)
    const context = await this.ragService.getContext(query);
    const answer = await this.genService.callLocalModel(context, query);
    return { query, context, answer };
  }

}