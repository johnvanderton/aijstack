
/**
 * Represents a single turn in the conversation
 */
interface ConversationTurn {
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

/**
 * 'Contextual Session Memory' Class Definition
 *
 * Service for managing contextual memory within a conversation session
 */
export class ContextualSessionMemory {
  
  private turns: ConversationTurn[] = [];
  private maxTurns: number;

  constructor(maxTurns: number = 20) {
    this.maxTurns = maxTurns;
  }

  /** Add a new turn to memory */
  public addTurn(role: "user" | "assistant", text: string) {
    this.turns.push({ role, text, timestamp: Date.now() });

    // Maintain sliding window
    if (this.turns.length > this.maxTurns) {
      this.turns = this.turns.slice(this.turns.length - this.maxTurns);
    }
  }

  /** Retrieve formatted context for the LLM */
  public getContext(): string {
    return this.turns.map(t => `${t.role}: ${t.text}`).join("\n");
  }

  /**
   * Optionally retrieve context enriched with external info
   * @param externalContext e.g., retrieved RAG documents
   */
  public getEnrichedContext(externalContext: string[]): string {
    const conversation = this.getContext();
    const externalText = externalContext.length > 0 ? `\nRetrieved Info:\n${externalContext.join("\n")}` : "";
    return `${conversation}${externalText}`;
  }

  /** Clear memory when session ends */
  public clear() {
    this.turns = [];
  }

  /** Get raw conversation turns */
  public getTurns(): ConversationTurn[] {
    return [...this.turns];
  }
}