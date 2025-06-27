import { Injectable } from '@nestjs/common';

@Injectable()
export class GenService {
  generateText(context: string, query: string): string {
    return `Based on context:\n${context}\n\nYour query was: "${query}"\n\n(Generated locally without LLM)`;
  }
}