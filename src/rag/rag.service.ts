import { Injectable } from '@nestjs/common';
import { EmbedService } from './embed.service';
import { StoreService } from './store.service';

@Injectable()
export class RAGService {
  constructor(
    private readonly embed: EmbedService,
    private readonly store: StoreService,
  ) {
    this.seedDocs();
  }

  private seedDocs() {
    const texts = [
      "NestJS is a progressive Node.js framework.",
      "RAG systems combine retrieval with generation.",
      "Local AI lets you run models without APIs.",
    ];
    texts.forEach((text, i) => {
      const embedding = this.embed.getEmbedding(text);
      this.store.addDoc(i.toString(), text, embedding);
    });
  }

  getRelevantContext(query: string): string {
    const queryVec = this.embed.getEmbedding(query);
    const results = this.store.search(queryVec);
    return results.map(d => d.content).join("\n");
  }
}