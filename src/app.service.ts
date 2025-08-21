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
   * TODO : keeps up to date the context following the previous response et questions
   * 
   * @param query input value which is the user's question
   * @returns an object containing the query, context, and generated answer
   */
  async generate(query: string) {

    /**
     * // 1. Get memory summary + relevant past turns
      const memory = await cms.retrieve(userMessage);

      // 2. Retrieve external knowledge docs
      const docs = await rag.retrieve(userMessage);

      // 3. Build final prompt
      const prompt = buildPrompt(memory, docs, userMessage);

      // 4. Call LLM
      const reply = await llm.generate(prompt);

      // 5. Save new turn into CMS
      await cms.store(userMessage, reply);

      return reply;
     * 
     **/

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