import { v4 as uuidv4 } from "uuid";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

/**
 * Service for managing conversation memory
 */
export class ConversationMemoryService {

  private conversations: Map<string, { role: string; message: string }[]> = new Map();
  private vectorStore: MemoryVectorStore;
  private embeddings: OpenAIEmbeddings;
  private summarizer: ChatOpenAI;

  /**
   * Constructor for ConversationMemoryService
   */
  constructor() {
    this.embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
    this.vectorStore = new MemoryVectorStore(this.embeddings);
    this.summarizer = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
  }

  async store(sessionId: string, role: "user" | "assistant", message: string) {
    if (!this.conversations.has(sessionId)) {
      this.conversations.set(sessionId, []);
    }
    const convo = this.conversations.get(sessionId)!;
    convo.push({ role, message });

    await this.vectorStore.addDocuments([
      { id: uuidv4(), pageContent: message, metadata: { sessionId, role } },
    ]);
  }

  async retrieve(sessionId: string, query: string): Promise<string> {
    const convo = this.conversations.get(sessionId) || [];

    // Step 1: Summarize history
    let summary = "";
    if (convo.length > 5) {
      const historyText = convo.map(m => `${m.role}: ${m.message}`).join("\n");
      const res = await this.summarizer.predict(
        `Summarize this conversation briefly:\n\n${historyText}`
      );
      summary = res;
    }

    // Step 2: Semantic recall
    const results = await this.vectorStore.similaritySearch(query, 3);
    const relevantPast = results.map(r => r.pageContent).join("\n");

    return `
            Summary: ${summary}
            Relevant past: ${relevantPast}
        `;
  }

}
