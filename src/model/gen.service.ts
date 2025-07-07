import { Injectable } from '@nestjs/common';


/**
 * `GenService` Method Definition
 * 
 * Service that provides methods to compute with a local model
 * 
 */
@Injectable()
export class GenService {
  async callLocalModel(context: string, query: string): Promise<string> {
    return `Answer (mocked): Based on:\n${context}\n\nQuery: ${query}`;
  }
}