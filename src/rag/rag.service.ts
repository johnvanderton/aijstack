import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from 'langchain/document';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";
import * as fs from 'fs';
import * as path from 'path';

/**
 * `RAGService` Class Definition
 *
 * Service for handling RAG (Retrieval-Augmented Generation) operations.
 */
@Injectable()
export class RAGService {

  /**
   * `embedder` Property Definition
   *
   * Embedding model (local)
   */
  private embedder: FeatureExtractionPipeline | null = null;

  /**
   * `vectorStore` Property Definition
   * 
   * This property holds the vector store instance used for similarity search operations
   */
  private vectorStore!: MemoryVectorStore;

  /**
   * `fileExtensions` Property Definition
   */
  //private readonly fileExtensions = ['.txt', '.pdf', '.xlsx', '.db', '.docx', 'doc', '.pptx', '.csv', '.md', '.json', 'html'];
  private readonly fileExtensions = ['.txt','html'];

  /**
   * `documentsPath` Property Definition
   */
  private readonly documentsPath = '../../documents';

  /**
   * Constructor
   */
  constructor() {
    this.loadDocuments();
  }

  /**
   * Loads the embedding model for text feature extraction
   * 
   * @returns {Promise<FeatureExtractionPipeline>} The loaded embedding model.
   */
  private async loadEmbedder() {
    if (!this.embedder) {
      this.embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2" // cached locally after first run
      );
    }
    return this.embedder;
  }

  /**
   * Embeddings wrapper compatible with LangChain
   */
  private embeddings = {
    /**
     * Embeds a query text into a vector representation
     */
    embedQuery: async (text: string): Promise<number[]> => {
      const model = await this.loadEmbedder();
      const output = await model(text, { pooling: "mean", normalize: true });
      return Array.from(output.data);
    },
    /**
     * Embeds an array of document texts into vector representations.
     * 
     * @param texts The array of document texts to embed.
     * @returns A promise that resolves to an array of vector representations.
     */
    embedDocuments: async (texts: string[]): Promise<number[][]> => {
      const model = await this.loadEmbedder();
      const results: number[][] = [];
      for (const text of texts) {
        const output = await model(text, { pooling: "mean", normalize: true });
        results.push(Array.from(output.data));
      }
      return results;
    },
  };

  /**
   * `loadDocuments` Method Definition
   * 
   * Loads documents from the specified directory and initializes the vector store. This method reads text files, splits them into 
   * smaller chunks, and creates embeddings for the chunks. It uses a mock embedding model for demonstration purposes, which should 
   * be replaced with a local embedding model in production.
   * 
   * @returns {Promise<void>}
   */
  async loadDocuments(folder: string = 'nestjs') {
    const docsPath = path.resolve(__dirname, this.documentsPath, folder);

    /**
     * Read all files from the documents directory
     */
    const files = fs.readdirSync(docsPath).filter(f =>
      this.fileExtensions.includes(path.extname(f).toLowerCase())
    );

    /**
     * Create files container
     */
    const docs: Document[] = [];

    /**
     * For each file found in the documents directory, load the file content and add it to the documents array
     */
    for (const file of files) {
      const loader = new TextLoader(path.join(docsPath, file));
      const loaded = await loader.load();
      docs.push(...loaded);
    }

    /**
     * Splits documents into smaller chunks for better processing
     */
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 20 });
    const splitDocs = await splitter.splitDocuments(docs);
    
    /**
     * Mock embedding model (replace with local model in production)
     */
    // const embeddings = {
    //   embedQuery: async (text: string) => Array(512).fill(0.1), // mock embedding
    //   embedDocuments: async (texts: string[]) => texts.map(() => Array(512).fill(0.1)),
    // };

    /**
     * Initializes the vector store with document embeddings
     */
    this.vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, this.embeddings);
  }

  /**
   * `getContext` Method Definition
   * 
   * Retrieves context for a given query by performing a similarity search based on the vector store.
   * 
   * @param query 
   * @returns 
   */
  async getContext(query: string): Promise<string> {
    const results = await this.vectorStore.similaritySearch(query, 3);
    return results.map(r => r.pageContent).join('\n');
  }
  
}