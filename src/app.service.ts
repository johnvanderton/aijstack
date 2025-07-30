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
   * This method is generating the context from the RAG service in order to send it to the Gen service (LLM).
   * Once the context is generated, it is sent to the Gen service along with the user's query to produce an answer.
   * 
   * @param query input value which is the user's question
   * @returns an object containing the query, context, and generated answer
   */
  async generate(query: string) {

    /**
     * Producing the context based from the query and refined from RAG
     */
    const context = await this.ragService.getContext(query);

    /**
     * Context as well as the query are sent to the the model
     */
    const answer = await this.genService.callLocalModel(context, query);

    return { answer };
  }

}