import { Injectable } from '@nestjs/common';

/**
 * `GenService` Method Definition
 * 
 * Service that provides methods to compute with a local model
 * 
 */
@Injectable()
export class GenService {

  /**
   * Calls the local model with the given context and query
   * 
   * @param context The context to provide to the model
   * @param query The query to ask the model
   * @returns The model's response
   */
  async callLocalModel(context: string, query: string): Promise<string> {
    return `Answer (mocked): Based on:\n${context}\n\nQuery: ${query}`;
  }

}