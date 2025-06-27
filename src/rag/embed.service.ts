import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbedService {
  getEmbedding(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    const vector = Array(100).fill(0);
    for (let i = 0; i < words.length && i < 100; i++) {
      vector[i] = words[i].charCodeAt(0) / 255;
    }
    return vector;
  }
}