import { Injectable } from '@nestjs/common';

type Doc = { id: string; content: string; embedding: number[] };

@Injectable()
export class StoreService {
  private docs: Doc[] = [];

  addDoc(id: string, content: string, embedding: number[]) {
    this.docs.push({ id, content, embedding });
  }

  search(queryEmbedding: number[], topK = 3): Doc[] {
    function cosine(a: number[], b: number[]): number {
      const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
      const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
      const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
      return dot / (normA * normB + 1e-10);
    }

    return this.docs
      .map(doc => ({ ...doc, score: cosine(doc.embedding, queryEmbedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}