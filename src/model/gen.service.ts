import { Injectable } from '@nestjs/common';

@Injectable()
export class GenService {
  async callLocalModel(context: string, query: string): Promise<string> {
    return `Answer (mocked): Based on:\n${context}\n\nQuery: ${query}`;
  }
}